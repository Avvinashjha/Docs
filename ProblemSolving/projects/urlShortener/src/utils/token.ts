import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

const ACCESS_TOKEN_SECRET = "certain_access_token_secret";
const REFRESH_TOKEN_SECRET = "certain_refresh_token_secret"

export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const REFRESH_TOKEN_EXPIRES_IN = "7d";

export function signAccessToken (user: IUser): string{
    return jwt.sign({id: user.id, username: user.username}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
}

export function signRefreshToken(user: IUser): string{
    return jwt.sign({id: user.id, username: user.username}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN});
}
