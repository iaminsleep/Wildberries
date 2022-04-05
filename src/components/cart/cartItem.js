import React from 'react';

const CartItem = ({API, img, name, price, count, id}) => {
  
  let totalPrice = 0;
  const totalItemPrice = +price * +count;
  totalPrice += totalItemPrice;
  
  const plusCartItem = id => {
    // const cart = App.state.cart;
    // const newCart = cart.map(good => {
    // if(good.id === id && good.count > 0) {
    //     good.count++;
    // }
    //   return good;
    // })
    // App.setState({cart: newCart});
  }

  const minusCartItem = id => {
    // const cart = App.state.cart;
    // const newCart = cart.map(good => {
    // if(good.id === id && good.count > 1) {
    //     good.count--;
    // }
    //   return good;
    // })
    // App.setState({cart: newCart});
  }

  const deleteCartItem = id => {
    // const cart = App.state.cart;
    // const newCart = cart.filter(good => {
    //   return good.id !== id;
    // })
    // App.setState({cart: newCart});
  }

  return (
    <tr>
      <td className="w-10"><img src={`${API}/img/goods/${img}`} alt={`${name}`}/></td>
      <td className="w-100">{name}</td>
      <td>${price}</td>
      <td><button className="cart-btn-minus" onClick={() => minusCartItem(id)}>-</button></td>
      <td>{count}</td>
      <td><button className="cart-btn-plus" onClick={() => plusCartItem(id)}>+</button></td>
      <td>${totalPrice}</td>
      <td><button className="cart-btn-delete" onClick={() => deleteCartItem(id)}>x</button></td>
    </tr> 
  );
}

export default CartItem;