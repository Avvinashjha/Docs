export function isValidPriority(priority){
    return ["high", "medium", "low"].includes(priority.toLowerCase());
}

export function formatTask(task){
    return `${task.title} (${task.priority} - ${task.completed ? "Completed" : "Incomplete"})`;
}

export function getFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

export function setToLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}