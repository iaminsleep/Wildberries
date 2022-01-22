import React from 'react';

const CartItem = ({API, img, name, price, count, id, minusCartItem, plusCartItem, deleteCartItem}) => {

  let totalPrice = 0;
  const totalItemPrice = +price * +count;
  totalPrice += totalItemPrice;

  return (
    <tr>
      <td><img src={`${API}/img/goods/${img}`} alt={`${name}`}/></td>
      <td>{name}</td>
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