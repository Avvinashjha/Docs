import crypto from "crypto";

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function base62Encode(num: number, length: number = 6): string{
    let s = "";
    while(num > 0){
        s = BASE62[num % 62] + s;
        num = Math.floor(num/62);
    }
    return s.padStart(length, "0");
}

/**
 * 
 * @param input 
 * @returns this will return same has for same url string
 */
export function tinyHash6(input: string): string {
    const hash = crypto.createHash("sha256").update(input).digest();

    // Take first 36 bits
    // First 5 bytes = 40 bits shift right 4 bits
    const first5 = hash.readUIntBE(0, 5);
    const truncated36 = first5 >>> 4;

    return base62Encode(truncated36, 6);
}


export function randomBase62(length: number){
    let out = "";
    for(let i = 0; i< length; i++){
        const index = crypto.randomInt(62);
        out += BASE62[index];
    }
    return out;
}
