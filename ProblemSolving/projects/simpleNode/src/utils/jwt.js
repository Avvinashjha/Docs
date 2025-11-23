import jwt from "jsonwebtoken";
const jwt_secret_key = "cia is cat in asia"

export function generateJwtToken(payload, expiresIn){
    const token = jwt.sign(payload, jwt_secret_key, {expiresIn: expiresIn})
    return token;
}


export function verifyJwtToken(token){
    try {
        const payload = jwt.verify(token, jwt_secret_key);
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}
