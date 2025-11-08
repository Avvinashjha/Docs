import { pool } from '../../src/config/database';

export class TestUtils {
  static async setupTestDatabase() {
    try {
      // Clear existing data
      await pool.execute('DELETE FROM todos');
      await pool.execute('DELETE FROM users');
      
      // Create test users
      await pool.execute(
        'INSERT INTO users (id, name, email) VALUES (1, "Test User 1", "test1@example.com")'
      );
      await pool.execute(
        'INSERT INTO users (id, name, email) VALUES (2, "Test User 2", "test2@example.com")'
      );
      await pool.execute(
        'INSERT INTO users (id, name, email) VALUES (3, "Test User 3", "test3@example.com")'
      );
    } catch (error) {
      console.error('Error setting up test database:', error);
      throw error;
    }
  }

  static async clearDatabase() {
    try {
      // Disable foreign key checks temporarily
      await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
      await pool.execute('DELETE FROM todos');
      await pool.execute('DELETE FROM users');
      await pool.execute('SET FOREIGN_KEY_CHECKS = 1');
    } catch (error) {
      console.error('Error clearing database:', error);
      // Re-enable foreign key checks if error occurs
      await pool.execute('SET FOREIGN_KEY_CHECKS = 1');
      throw error;
    }
  }

  static async createTestUser(id: number = 1) {
    try {
      await pool.execute(
        'INSERT IGNORE INTO users (id, name, email) VALUES (?, ?, ?)',
        [id, `Test User ${id}`, `test${id}@example.com`]
      );
    } catch (error) {
      console.error('Error creating test user:', error);
      throw error;
    }
  }

  static async createTestTodo(userId: number = 1, todoData?: Partial<{ title: string; description: string; status: string }>) {
    try {
      const title = todoData?.title || 'Test Todo';
      const description = todoData?.description || 'Test description';
      const status = todoData?.status || 'pending';

      const [result] = await pool.execute(
        'INSERT INTO todos (user_id, title, description, status) VALUES (?, ?, ?, ?)',
        [userId, title, description, status]
      );
      return (result as any).insertId;
    } catch (error) {
      console.error('Error creating test todo:', error);
      throw error;
    }
  }

  static async getTodoById(id: number) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM todos WHERE id = ?',
        [id]
      );
      const todos = rows as any[];
      return todos.length > 0 ? todos[0] : null;
    } catch (error) {
      console.error('Error getting todo:', error);
      throw error;
    }
  }

  static async closePool() {
    await pool.end();
  }
}