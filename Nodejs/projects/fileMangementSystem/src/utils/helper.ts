export function errorResponse(message: any){
    return {
        success: false,
        data: message
    }
}

export function successResponse(message: any){
    return {
        success: true,
        data: message
    }
}
