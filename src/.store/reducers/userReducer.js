const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USER_INFO':
      return state = action.data;
    default:
      return state;
  }
}

export default userReducer;