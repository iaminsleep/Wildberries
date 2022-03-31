const setCartItems = (goodsData) => {
  return {
    type: 'SET_CART_DATA',
    data: goodsData,
  }
}

export default setCartItems;