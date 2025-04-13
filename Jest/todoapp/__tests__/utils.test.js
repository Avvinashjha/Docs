import { formatTask, isValidPriority } from "../src/utils.js"
beforeEach(()=>{
    global.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
    }
})
test("validate priority", ()=>{
    expect(isValidPriority("high")).toBe(true);
    expect(isValidPriority("invalid")).toBe(false);
})

test("format task correctly", ()=>{
    const task = { title: 'Learn Jest', priority: 'high', completed: true };
    expect(formatTask(task)).toBe('Learn Jest (high - Completed)');
})


