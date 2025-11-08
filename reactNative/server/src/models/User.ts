export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUserRequest {
    name: string;
    email: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
}

