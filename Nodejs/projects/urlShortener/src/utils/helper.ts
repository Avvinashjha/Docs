export function defaultResponse (status?: boolean, message?: string, error?: string | Error){
    const obj = {
        status,
        message,
        error
    }
    return obj;
}