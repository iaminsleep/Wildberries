const goodsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_GOODS_DATA':
      return state = action.data;
    default:
      return state;
  }
}

export default goodsReducer;