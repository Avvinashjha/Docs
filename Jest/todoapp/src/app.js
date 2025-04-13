// app.js
import { TaskManager } from './taskManager.js';
import { isValidPriority, formatTask } from './utils.js';

const taskManager = new TaskManager();

function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = formatTask(task);
  
    // Checkbox for marking as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      taskManager.toggleComplete(task.id);
      displayTasks();
    });
    li.prepend(checkbox);
  
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskManager.deleteTask(task.id);
      displayTasks();
    });
    li.appendChild(deleteButton);
  
    // Dropdown for changing priority
    const prioritySelect = document.createElement('select');
    ['high', 'medium', 'low'].forEach(p => {
      const option = document.createElement('option');
      option.value = p;
      option.textContent = p;
      option.selected = p === task.priority;
      prioritySelect.appendChild(option);
    });
    prioritySelect.addEventListener('change', () => {
      taskManager.changePriority(task.id, prioritySelect.value);
      displayTasks();
    });
    li.appendChild(prioritySelect);
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        const newTitle = prompt('Enter new title:', task.title);
        const newDescription = prompt('Enter new description:', task.description);
        const newPriority = prompt('Enter new priority (high/medium/low):', task.priority);

        if (newTitle && newDescription && isValidPriority(newPriority)) {
            task.title = newTitle;
            task.description = newDescription;
            task.priority = newPriority;
            taskManager.saveToLocalStorage();
            displayTasks();
        } else {
            alert('Invalid input!');
        }
    });
    li.appendChild(editButton);
    return li;
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list
    taskManager.tasks.forEach(task => {
      taskList.appendChild(createTaskElement(task));
    });
}

document.getElementById('add-task').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
  
    if (!isValidPriority(priority)) {
      alert('Invalid priority!');
      return;
    }
  
    const newTask = taskManager.addTask(title, description, priority);
    displayTasks(newTask);
  });
  

document.getElementById('filter-all').addEventListener('click', () => {
    displayFilteredTasks('all');
  });
  
document.getElementById('filter-completed').addEventListener('click', () => {
    displayFilteredTasks('completed');
});
  
document.getElementById('filter-incomplete').addEventListener('click', () => {
    displayFilteredTasks('incomplete');
});

document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredTasks = taskManager.tasks.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list
    filteredTasks.forEach(task => {
      taskList.appendChild(createTaskElement(task));
    });
});
  
function displayFilteredTasks(filterType) {
    const filteredTasks = taskManager.filterTasks(filterType);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list
    filteredTasks.forEach(task => {
      taskList.appendChild(createTaskElement(task));
    });
}

displayTasks()