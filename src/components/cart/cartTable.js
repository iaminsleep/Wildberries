import React from 'react';

import CartItem from './cartItem';

function CartTable ({API, cartItems, accessToken, createFormData}) {
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
        {cartItems.map(cartItem => 
          <CartItem 
            key={cartItem.id} img={cartItem.img} name={cartItem.name} 
            price={cartItem.price} API={API} quantity={cartItem.quantity} id={cartItem.id}
            createFormData={createFormData} accessToken={accessToken}
          />
        )}
      </tbody>
    </table>
  )
}

export default CartTable;