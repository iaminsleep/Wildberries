const getCartItems = (goodsData) => {
  return {
    type: 'GET_CART_DATA',
    data: goodsData,
  }
}

export default getCartItems;