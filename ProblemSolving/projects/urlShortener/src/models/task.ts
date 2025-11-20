export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "completed" | "high";
export interface Task {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTask {
    title: String;
    priority: Priority;
    status: Status;
}

export interface UpdateTask {
    title?:string;
    priority?:Priority;
    status?: Status 
}
