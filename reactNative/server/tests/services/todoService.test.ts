import { TodoService } from '../../src/services/todoService';
import { TestUtils } from '../utils/testUtils';

describe('TodoService', () => {
  beforeAll(async () => {
    await TestUtils.setupTestDatabase();
  });

  afterAll(async () => {
    await TestUtils.clearDatabase();
    await TestUtils.closePool();
  });

  beforeEach(async () => {
    await TestUtils.clearDatabase();
    // Re-create base users after clearing
    await TestUtils.createTestUser(1);
    await TestUtils.createTestUser(2);
  });

  describe('getAllTodo', () => {
    it('should return empty array when no todos exist', async () => {
      const todos = await TodoService.getAllTodo();
      expect(todos).toEqual([]);
    });

    it('should return all todos', async () => {
      await TestUtils.createTestTodo(1);
      await TestUtils.createTestTodo(2);

      const todos = await TodoService.getAllTodo();
      
      expect(todos).toHaveLength(2);
      expect(todos[0]).toHaveProperty('title', 'Test Todo');
      expect(todos[0]).toHaveProperty('user_id');
    });
  });

  describe('getAllTodoByUserId', () => {
    it('should return todos for specific user', async () => {
      await TestUtils.createTestTodo(1);
      await TestUtils.createTestTodo(2);
      await TestUtils.createTestTodo(1);

      const user1Todos = await TodoService.getAllTodoByUserId(1);
      const user2Todos = await TodoService.getAllTodoByUserId(2);

      expect(user1Todos).toHaveLength(2);
      expect(user2Todos).toHaveLength(1);
      expect(user1Todos[0]).toHaveProperty('user_id', 1);
    });

    it('should return empty array for user with no todos', async () => {
      const todos = await TodoService.getAllTodoByUserId(1); // User exists but has no todos
      expect(todos).toEqual([]);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const todoData = {
        userId: 1,
        title: 'New Todo',
        description: 'New description'
      };

      const todoId = await TodoService.createTodo(todoData);
      
      expect(todoId).toBeGreaterThan(0);

      // Verify the todo was created
      const todos = await TodoService.getAllTodoByUserId(1);
      expect(todos).toHaveLength(1);
      expect(todos[0]).toMatchObject({
        title: 'New Todo',
        description: 'New description',
        user_id: 1,
        status: 'pending'
      });
    });

    it('should create todo without description', async () => {
      const todoData = {
        userId: 1,
        title: 'Todo without description'
      };

      const todoId = await TodoService.createTodo(todoData);
      expect(todoId).toBeGreaterThan(0);
    });
  });

  describe('updateTodo', () => {
    it('should update todo fields', async () => {
      const todoId = await TestUtils.createTestTodo(1);
      
      const updateData = {
        title: 'Updated Title',
        description: 'Updated description',
        status: 'completed' as const
      };

      const updated = await TodoService.updateTodo(todoId, updateData);
      
      expect(updated).toBe(true);

      // Verify update
      const todos = await TodoService.getAllTodoByUserId(1);
      const updatedTodo = todos.find(todo => todo.id === todoId);
      
      expect(updatedTodo).toMatchObject(updateData);
    });

    it('should return false when updating non-existent todo', async () => {
      const updateData = { title: 'Updated' };
      const updated = await TodoService.updateTodo(999, updateData);
      
      expect(updated).toBe(false);
    });
  });

  describe('deleteTodo', () => {
    it('should delete existing todo', async () => {
      const todoId = await TestUtils.createTestTodo(1);
      
      const deleted = await TodoService.deleteTodo(todoId);
      
      expect(deleted).toBe(true);

      // Verify deletion
      const todos = await TodoService.getAllTodoByUserId(1);
      expect(todos).toHaveLength(0);
    });

    it('should return false when deleting non-existent todo', async () => {
      const deleted = await TodoService.deleteTodo(999);
      expect(deleted).toBe(false);
    });
  });
});