import { getInputElement, getTaskElement } from "./utils.js";
const root = document.getElementById("root");
const tasks = [];
const TASK_KEY = "todo_tasks";

class Task{
    constructor(id, title){
        this.id = id,
        this.title= title
    }
}

function addTask (e) {
    if(e.key === "Enter"){
        const task = new Task(tasks.length + 1, e.target.value);
        tasks.push(task);
        render()
    }
}


function render () {
    let taskInputValue = "";
    const taskInputBox = getInputElement(
        "Add task",
        taskInputValue,
        "",
        "input", 
        addTask 
    );
    root.appendChild(taskInputBox)
    const taskList = tasks.map(task => getTaskElement(task, ()=> console.log("delete task"), ()=> console.log("edit task"))).forEach((item)=>{
        root.appendChild(item)
    });
}

render()