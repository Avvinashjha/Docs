import request from "supertest";
import app from "../../src/index";
import { TestUtils } from "../utils/testUtils";
import { describe } from "node:test";

describe("Todo API Integration Tests", () => {
  beforeAll(async () => {
    await TestUtils.clearDatabase();
    await TestUtils.createTestUser(1);
    await TestUtils.createTestUser(2);
  });

  afterAll(async () => {
    await TestUtils.clearDatabase();
    await TestUtils.closePool();
  });

  beforeEach(async () => {
    await TestUtils.clearDatabase();
    // Re-create test users after clearing database
    await TestUtils.createTestUser(1);
    await TestUtils.createTestUser(2);
  });

  describe("GET /todos", () => {
    it("should return empty when no todos exist", async () => {
      const response = await request(app).get("/todos").expect(200);

      expect(response.body).toEqual({
        success: true,
        data: [],
        count: 0,
      });
    });

    it("should return all todos", async () => {
      await TestUtils.createTestTodo(1);
      await TestUtils.createTestTodo(2);

      const response = await request(app).get("/todos").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.count).toBe(2);
    });
  });

  describe("Get /todo/user/:userId", () => {
    it("should return todos for specific user", async () => {
      await TestUtils.createTestTodo(1);
      await TestUtils.createTestTodo(1);
      await TestUtils.createTestTodo(2);

      const response = await request(app).get("/todos/user/1").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toHaveProperty("user_id", 1);
    });

    it("should return 404 when no todos found for user", async () => {
      const response = await request(app)
        .get("/todos/user/invalid")
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid user ID");
    });
  });

  describe("Post /todos", () => {
    it("should create a new todo", async () => {
      const todoData = {
        title: "API Test todo",
        description: "Created via API test",
        userId: 1,
      };

      const response = await request(app)
        .post("/todos")
        .send(todoData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Todo created successfully");
      expect(response.body.data.id).toBeGreaterThan(0);
    });

    it("should return 400 when missing required fields", async () => {
      const invalidData = {
        description: "missing tile and userId",
      };
      const response = await request(app)
        .post("/todos")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Title and userId are required");
    });

    it("should return 400 when missing title", async () => {
      const invalidData = {
        userId: 1,
        description: "Missing title",
      };
      const response = await request(app)
        .post("/todos")
        .send(invalidData)
        .expect(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 when missing userId", async () => {
      const invalidData = {
        title: "Missing userId",
      };

      const response = await request(app)
        .post("/todos")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /todos/:id", () => {
    it("should update existing todo", async () => {
      const todoId = await TestUtils.createTestTodo(1);

      const updateData = {
        title: "Updated via API",
        status: "completed",
      };

      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Todo updated successfully");
    });

    it("should return 404 when updating non-existent todo", async () => {
      const response = await request(app)
        .put("/todos/999")
        .send({ title: "Updated" })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Todo not found");
    });

    it("should return 400 for invalid todo ID", async () => {
      const response = await request(app)
        .put("/todos/invalid")
        .send({ title: "Updated" })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid todo id");
    });

    it("should return 400 when no fields to update", async () => {
      const todoId = await TestUtils.createTestTodo(1);

      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("No fields to update");
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should delete existing todo", async () => {
      const todoId = await TestUtils.createTestTodo(1);

      const response = await request(app)
        .delete(`/todos/${todoId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Todo deleted successfully");
    });

    it("should return 404 when deleting non-existent todo", async () => {
      const response = await request(app).delete("/todos/999").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Todo not found");
    });

    it("should return 400 for invalid todo ID", async () => {
      const response = await request(app).delete("/todos/invalid").expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid todo id");
    });
  });
});
