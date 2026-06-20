import type { Todo, TodoAction, TodoState } from "./todo.types";
export const INITIAL_STATE: TodoState = {todos: []};
export const todoReducer = (state: TodoState, action: TodoAction) : TodoState => {
    switch (action.type){
        case "ADD_TODO":{
            const newTodo: Todo = {
                id: crypto.randomUUID(),
                text: action.payload.text,
                priority: action.payload.priority,
                isCompleted: false,
                createdAt: new Date(),
            };
            return {todos: [newTodo, ...state.todos]};
        }
        case "TOGGLE_TODO":
            return {
                todos: state.todos.map((todo)=> 
                    todo.id === action.payload ? 
                {...todo, isCompleted: !todo.isCompleted} : todo)
            }
        case "DELETE_TODO":
            return {
                todos: state.todos.filter((todo) => todo.id !== action.payload)
            }
        case "EDIT_TODO":
            return {
                todos: state.todos.map((todo) => todo.id === action.payload.id ? 
            {...todo, text: action.payload.newText,
                        priority: action.payload.newPriority
            } : todo)
            }
        default:
            return state;
    }
}