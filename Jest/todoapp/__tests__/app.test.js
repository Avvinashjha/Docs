beforeEach(()=>{
    document.body.innerHTML = `
        <input id="title" value="Learn Jest">
    <input id="description" value="Write tests">
    <select id="priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <button id="add-task">Add Task</button>
    <input id="search" placeholder="Search tasks">
    <button id="filter-all">All</button>
    <button id="filter-completed">Completed</button>
    <button id="filter-incomplete">Incomplete</button>
    <ul id="task-list"></ul>
    `;
});

test("add a task to the DOM", () => {
    require("../src/app.js") // load app logic

    document.getElementById("add-task").click();
    const taskList = document.getElementById("task-list");
    expect(taskList.children.length).toBe(1);
    expect(taskList.textContent).toContain("Learn Jest (high - Incomplete)")
})