import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import setModalVisibility from '../../.store/actions/setModalVisibility';

import CartTable from './cartTable';

function CartModal({API, getCookie, createFormData}) {
  const cart = useSelector(state => state.cart);
  const accessToken = getCookie('accessToken');
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const countTotalCost = () => {
      let totalPrice = 0;
      cart.forEach(good => {
        let totalGoodPrice = +good.price * +good.quantity;
        totalPrice += totalGoodPrice;
        setTotalPrice(totalPrice);
      })
    }
    countTotalCost();
  }, [cart]);

  const submitOrder = function() {
    
  }

  return (
    <div className="overlay show" id="modal-cart">
      <div className="modal">
        <header className="modal-header">
          <h2 className="modal-title">Cart</h2>
          <button className="modal-close" onClick={() => dispatch(setModalVisibility(false))}>x</button>
        </header>
        <div className="cart-wrapper">
          {cart.length > 0 ? 
            <CartTable API={API} cartItems={cart} 
            accessToken={accessToken} createFormData={createFormData}/> 
            : <div id="cart-empty">There is nothing in the cart yet.</div>
          }
        </div>
        {cart.length > 0 ?
          <form className="modal-form" action="" onSubmit={submitOrder}>
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
            <div className="total">Total:&nbsp;&nbsp;&nbsp;${totalPrice}</div>
            <button className="button cart-buy" type="submit">
              <span className="button-text">Checkout</span>
            </button>
          </form> : ''
        }
      </div>
    </div>
  );
}

export default CartModal;