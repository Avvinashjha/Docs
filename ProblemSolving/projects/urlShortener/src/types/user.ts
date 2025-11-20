export interface DbUser {
    id: number;
    username: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
}

// types/auth.ts
export interface IUser {
  id: number;
  username: string;
  passwordHash: string;
}

export interface JwtUserPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}
