const modalReducer = (state = false, action) => {
    switch(action.type) {
        case 'SET_MODAL_VISIBILITY':
            return state = action.data;
        default:
            return state;
    }
}
  
export default modalReducer;