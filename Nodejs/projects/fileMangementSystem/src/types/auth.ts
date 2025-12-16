export interface RegisterUserInput {
    name: string,
    email: string,
    password: string
}

export interface AuthInput {
    email: string,
    password: string,
    ip?: string,
    userAgent?: string
}

export interface AuthUser {
    id: number,
    name: string,
    email: string,
    roles: string[]
}

export interface AuthResponse {
    user: AuthUser;
    accessToken: string,
    refreshToken: string
}

export interface TokenRotateResponse{
    accessToken: string,
    refreshToken: string
}
