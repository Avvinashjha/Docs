export const simpleResponse = (state, message) => {
    const obj = {
        success: state,
        message: message
    }
    return obj;
}

