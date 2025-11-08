export type Status = "pending" | "in_progress" | "completed" | "cancelled";
export interface Todo {
    id: number,
    user_id: number,
    title: string,
    description: string,
    status: Status,
    created_at: Date,
    updated_at: Date,
    closed_at: Date
}

export interface CreateTodo {
    userId: number,
    title: string,
    description?:string

}

export interface UpdateTodo{
    title?: string,
    description?:string,
    status?: Status
}