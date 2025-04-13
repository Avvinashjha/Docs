import { getFromLocalStorage, setToLocalStorage } from "./utils.js";

export class TaskManager{
    constructor(){
        this.tasks = getFromLocalStorage("tasks") || [];
    }

    saveToLocalStorage(){
        setToLocalStorage("tasks", this.tasks);
    }

    addTask(title, description, priority){
        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            completed:false
        }
        this.tasks.push(newTask);
        this.saveToLocalStorage();
        return newTask;
    }

    deleteTask(id){
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToLocalStorage();
    }

    toggleComplete(id){
        const task = this.tasks.find(task => task.id === id);
        if(task){
            task.completed = !task.completed;
            this.saveToLocalStorage();
        }
    }

    changePriority(id, newPriority){
        const task = this.tasks.find(task => task.id === id);
        if(task){
            task.priority = newPriority;
            this.saveToLocalStorage();
        }
    }

    sortTaskByPriority(){
        const priorityOrder = {high: 1, medium: 2, low: 3};
        this.tasks.sort((a,b)=> priorityOrder[a.priority] - priorityOrder[b.priority]);
        this.saveToLocalStorage();
    }
    filterTask(filterType){
        switch(filterType){
            case "completed":
                return this.tasks.filter(task => task.completed);
            case "incomplete":
                return this.tasks.filter(task => !task.completed);
            default:
                return this.tasks;
        }
    }

    clearAll (){
        this.tasks = [];
        this.saveToLocalStorage();
    }

}