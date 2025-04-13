import { TaskManager } from "../src/taskManager.js";
beforeEach(()=>{
    global.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
    };
})
describe("TaskManager", () => {
    let taskManager;

    beforeEach(()=>{
        taskManager = new TaskManager();
    });

    test("adds a new task", ()=>{
        const task = taskManager.addTask("Learn Test", "write test", "high");
        expect(task.title).toBe("Learn Test");
        expect(task.priority).toBe("high");
        taskManager.clearAll();
    })

    test("delete a task", () => {
        const task = taskManager.addTask("Learn Test", "write test", "high");
        taskManager.deleteTask(task.id);
        expect(taskManager.tasks.find(t => t.id === task.id )).toBe(undefined);
        taskManager.clearAll();
    })

    test("toggle task completion", () => {
        const task = taskManager.addTask("Learn Test", "write test", "high");
        taskManager.toggleComplete(task.id);
        expect(taskManager.tasks.find(i => i.id === task.id).completed).toBe(true);
        taskManager.clearAll();
    })

    test("filter task by status", () => {
        taskManager.addTask('Task 1', '', 'high');
        taskManager.addTask('Task 2', '', 'medium');
        taskManager.toggleComplete(taskManager.tasks[0].id);

        expect(taskManager.filterTask('completed').length).toBe(1);
        expect(taskManager.filterTask('incomplete').length).toBe(1);
        taskManager.clearAll();
    })

    test("change task priority", () => {
        const task = taskManager.addTask("Learn Test", "Write test", "high");
        taskManager.changePriority(task.id, 'low');
        expect(taskManager.tasks[0].priority).toBe("low");
    })

    test("sort tasks by priority", () => {
        taskManager.clearAll();
        taskManager.addTask("task-1", "", "medium");
        taskManager.addTask("task-2", "", "high");
        taskManager.addTask("task-3", "", "low");
        taskManager.sortTaskByPriority();
        console.log(taskManager.tasks);
        expect(taskManager.tasks[0].priority).toBe("high");
        expect(taskManager.tasks[1].priority).toBe("medium");
        expect(taskManager.tasks[2].priority).toBe("low");
       
    })

    test('filters tasks by status', () => {
        taskManager.clearAll();
        const task1 = taskManager.addTask('Task 1', '', 'high');
        const task2 = taskManager.addTask('Task 2', '', 'medium');
        taskManager.toggleComplete(task1.id);
      
        expect(taskManager.filterTask('completed').length).toBe(1);
        expect(taskManager.filterTask('incomplete').length).toBe(1);
      });
})