import React from 'react';

import CartTable from './cartTable';

function CartModal({cart, minusCartItem, plusCartItem, deleteCartItem}) {
  return (
    <div className="overlay" id="modal-cart">
      <div className="modal">
        <header className="modal-header">
          <h2 className="modal-title">Cart</h2>
          <button className="modal-close">x</button>
        </header>
        <CartTable 
          cart={cart} 
          minusCartItem={minusCartItem}  
          plusCartItem={plusCartItem} 
          deleteCartItem={deleteCartItem}
        />
        <form className="modal-form" action="">
          <input
            className="modal-input"
            type="text"
            placeholder="Your Name"
            name="nameCustomer"
          />
          <input
            className="modal-input"
            type="text"
            placeholder="Phone"
            name="phoneCustomer"
          />
          <button className="button cart-buy" type="submit">
            <span className="button-text">Checkout</span>
          </button>
        </form>
      </div>
    </div>
  );
}
  
export default CartModal;