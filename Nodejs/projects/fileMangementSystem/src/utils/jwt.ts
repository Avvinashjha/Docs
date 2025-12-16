import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET;
const accessExp = process.env.JWT_ACCESS_EXP || "15m";

export interface AccessTokenPayload {
  sub: string; // user id
  roles: string[];
  tokenVersion: number;
}

export interface DecodedAccessToken extends JwtPayload {
  sub: string;
  roles: string[];
  tokenVersion: number;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  if (!accessSecret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }
  return jwt.sign(payload, accessSecret, { expiresIn: accessExp });
}

export function verifyAccessToken(token: string): DecodedAccessToken | null {
  try {
    if (!accessSecret) {
      throw new Error("JWT_ACCESS_SECRET is not defined");
    }
    const decoded = jwt.verify(token, accessSecret) as DecodedAccessToken;
    return decoded;
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return null;
  }
}
