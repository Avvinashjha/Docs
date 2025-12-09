import bcrypt from "bcrypt";
import crypto from "crypto";
const generateHash = async (password, salt) => {
    const hash = await bcrypt.hash(password, )
}

export async function comparePassword(hashed_password, password){
      const isEqual = await bcrypt.compare(password, hashed_password);
      return isEqual;
}

export async function generateRandomTokenUsingBcrypt(name) {
    const currentTimeString = Date.now();
    const res = await bcrypt.hash(currentTimeString+name+"this is a random secrteat", 2);
    return res;
}

export async function generateRandomToken() {
    const randomBytes = crypto.randomBytes(64);
    return randomBytes.toString("hex")
}

