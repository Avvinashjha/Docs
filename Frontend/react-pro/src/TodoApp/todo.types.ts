export type Priority = "low" | "medium" | "high";

export interface Todo {
    id: string;
    text: string;
    isCompleted: boolean;
    priority: Priority;
    createdAt: Date;
};

export type SortOptions = "date-asc" | "date-desc" | "priority-high" | "priority-low" | 'alphabetical';

export interface TodoState {
    todos: Todo[];
};

export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string; priority: Priority } }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; newText: string; newPriority: Priority } 
};
