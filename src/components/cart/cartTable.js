import React from 'react';

import CartItem from './cartItem';

function CartTable ({API, cart, minusCartItem, plusCartItem, deleteCartItem}) {
  
  /* Вычисление общей суммы товаров */
  let totalPrice = 0;
  cart.forEach(good => {
    const totalItemPrice = +good.price * +good.count;
    totalPrice += totalItemPrice;
  })

  return (
    <table className="cart-table">
      <colgroup>
        <col className="col-goods" />
        <col className="col-price" />
        <col className="col-minus" />
        <col className="col-qty" />
        <col className="col-plus" />
        <col className="col-total-price" />
        <col className="col-delete" />
      </colgroup>
      <thead>
        <tr>
          <th>Good(s)</th>
          <th>Price</th>
          <th colSpan="3">Qty.</th>
          <th colSpan="2">Total</th>
        </tr>
      </thead>
      <tbody className="cart-table__goods">
        {cart.map(good => 
          <CartItem 
            key={good.id} name={good.name} price={good.price} API={API}
            count={good.count} id={good.id} minusCartItem={minusCartItem} 
            plusCartItem={plusCartItem} deleteCartItem={deleteCartItem}
          />
        )}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan="5">Total:</th>
          <th className="card-table__total" colSpan="2">${totalPrice}</th>
        </tr>
      </tfoot>
    </table>
  )
}

export default CartTable;