export function greet(name: string): string{
    return  `Hello, ${name}! Welcome to Nodejs with TypeScript!`;
}

export function add(a: number, b: number): number{
    return a + b;
}

export function sendResponse(status: boolean, message: string, data?: any): {success: boolean, message: string, data?: any }{
    if(!data ){
         return {
            success: status,
            message: message
        }
    }
    return {
        success: status,
        message: message,
        data: data
    }
}