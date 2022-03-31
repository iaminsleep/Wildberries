export const errorReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_ERROR':
            return state = action.data;
        default:
            return state;
    }
}

export const warningReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_WARNING':
            return state = action.data;
        default:
            return state;
    }
}

export const successReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_SUCCESS':
            return state = action.data;
        default:
            return state;
    }
}