export const setError = (errorMessage) => {
    return {
        type: 'SET_ERROR',
        data: errorMessage,
    }
}

export const setWarning = (warningMessage) => {
    return {
        type: 'SET_WARNING',
        data: warningMessage,
    }
}

export const setSuccess = (successMessage) => {
    return {
        type: 'SET_SUCCESS',
        data: successMessage,
    }
}