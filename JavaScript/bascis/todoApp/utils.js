export function getButtonElement (title, style, onClick) {
    const button = document.createElement("button");
    button.addEventListener("click", onClick);
    button.textContent = title;
    button.style.cssText = style;
    return button;
}

export function getInputElement (placeholder, value, style, type, addTask){
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    input.style.cssText = style;
    input.addEventListener("keypress", addTask)
    return input;
}

export function getTaskElement(task, onDelete, onEdit){
    const editButton = getButtonElement("Edit", "", onEdit)
    const deleteButton = getButtonElement("Delete", "", onDelete);
    const list = document.createElement("div");
    list.innerHTML = innerElement;
    return list;
    
}



export function getDataFromLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
}

export function addDataToLocalStorage(key, value) {
    const data = getDataFromLocalStorage(key);
    localStorage.setItem(key, [...data, value]);
    console.log("Added Item to the storage");
}