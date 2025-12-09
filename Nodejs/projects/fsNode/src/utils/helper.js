export function errorResponse (data){
    return {
        success: false,
        data: data
    }
}

export function successResponse(data){
    return {
        success: true,
        data:data
    }
}