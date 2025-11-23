import jwt from "jsonwebtoken";
const accessSecret = process.env.JWT_ACCESS_SECRET;
const accessExp = process.env.JWT_ACCESS_EXP;

export function signAccessToken(payload){
    return jwt.sign(payload, accessSecret, {expiresIn: accessExp});
}

export function verifyAccessToken(token){
    try {
        return jwt.verify(token, accessSecret);
    } catch (error) {
        console.log(error);
        return null;
    }
}