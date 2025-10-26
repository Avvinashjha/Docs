/**
 * Requirements
 * - task (title, status, createdAt, updatedAt)
 * - status = ["TODO", "IN_PROGRESS", "COMPLETED"]
 * - createdAt = creation time of the task
 * 
 * Approach
 * - Interface to add task
 *     - input element
 *     - button / enter to add task
 * - Interface to show task
 *     - list of task
 *     - user can change the status/title of the task
 *          - edit task
 */
class TodoApp {
    constructor(){
        this.root = document.getElementById("root");
        this.list = [],
        this.currentItem = null,
        this.localStorageKey= "todo-list-v1",
        this.todoSchema = {
            id: 0,
            title: "",
            status: 0,
            createdAt: Date.now(),
            updateAt: null
        }
    }

    createTodo(title, status){
        // create a todo object
        const todoObj = {
            id: this.list.length + 1,
            title: title, 
            status: status,
            createdAt:  Date.now(),
            updateAt: null
        }
        // push the todo on top of the task list
        this.list.push(todoObj);
    }
    updateTodo(id, title, status){
        // find the todo with id
        const todoObj = this.list.find(item => item.id === id);
        todoObj.title = title;
        todoObj.status = status;
        todoObj.updateAt= Date.now()
    }
    deleteTodo(id){
        this.list = this.list.filter(item => item.id !== id);
    }

    createTodoInputView(){
        // create a input container
        const inputContainer = document.createElement("div");
        inputContainer.id = "input-container";
        inputContainer.className = "input__container";

        // create a input of type text
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.id = "todo-input";
        inputElement.className = "todo__input";

        // add event listener to inputElement so that when user enter then we will insert a todo
        inputElement.addEventListener("keydown", (e)=>{
            /**
             * The preventDefault() method of the Event interface tells the user agent that the event is being explicitly handled, 
             * so its default action, such as page scrolling, link navigation, or pasting text, should not be taken.
             */
            e.preventDefault();
            if(e.key === "enter"){
                const title = e.target.value;
                const status = 0;
                if(title.length > 0){
                    this.createTodo(title, status);
                }
            }
        })

        inputContainer.appendChild(inputElement);
        return inputContainer;
    }

    createTodoListView(){
        const todoViewContainer = document.createElement("div");
        todoViewContainer.id = "todo-container";
        todoViewContainer.className = "todo__container";

        // create todo items view

        // Create todo view Header
        const todoItemsHeader = document.createElement("div");
        todoItemsHeader.className = "todo__item__container-header";
        // Add the header columns
        const keys = Object.keys(this.todoSchema);
        keys.forEach((key) => {
            const todoKey = document.createElement("span");
            todoKey.className = key + "_column";
            todoItemsHeader.appendChild(todoKey);
        })

        const todoItemContainer = document.createElement("div");
        todoItemContainer.className = "todo__item__container";
        // create div for each of the todo item elements
        this.list.forEach((item) => {
            const todoItem = document.createElement("div");
            todoItem.className = "row";
            keys.forEach((key) => {
                const todoKey = document.createElement("span");
                todoKey.className = key + "_row";
                todoKey.innerText = 
                todoItem.appendChild(todoKey);
            })
            todoItemContainer.appendChild(todoItem);
        })

        
    }
    



}