const cartReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_CART_DATA':
      return state = action.data;
    default:
      return state;
  }
}

export default cartReducer;