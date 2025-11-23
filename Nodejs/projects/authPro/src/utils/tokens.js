import crypto from "crypto";
import { promisify } from "util";
const randomBytesAsync = promisify(crypto.randomBytes);

export async function generateRefreshTokenString(len = 64){
    const bytes = await randomBytesAsync(Math.ceil(len/2));
    return bytes.toString("hex").slice(0,len);
}

export function hashToken(token){
    return crypto.createHash("sha256").update(token).digest("hex");
}