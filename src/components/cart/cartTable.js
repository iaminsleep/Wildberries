import React from 'react';

import CartItem from './cartItem';

function CartTable ({API, cart, minusCartItem, plusCartItem, deleteCartItem}) {
  return (
    <table className="cart-table">
      <colgroup>
        <col className="col-image" />
        <col className="col-name" />
        <col className="col-price" />
        <col className="col-minus" />
        <col className="col-qty" />
        <col className="col-plus" />
        <col className="col-total-price" />
        <col className="col-delete" />
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th colSpan="3">Qty.</th>
          <th colSpan="1">Total</th>
        </tr>
      </thead>
      <tbody className="cart-table__goods">
        {cart.map(good => 
          <CartItem 
            key={good.id} img={good.img} name={good.name} price={good.price} API={API}
            count={good.count} id={good.id} minusCartItem={minusCartItem} 
            plusCartItem={plusCartItem} deleteCartItem={deleteCartItem}
          />
        )}
      </tbody>
    </table>
  )
}

export default CartTable;