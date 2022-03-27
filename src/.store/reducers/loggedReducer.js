const loggedReducer = (state = false, action) => {
  switch(action.type) {
    case 'SET_LOGGED_STATUS':
      return state = action.data;
    default:
      return state;
  }
}

export default loggedReducer;