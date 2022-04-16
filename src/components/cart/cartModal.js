import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import setModalVisibility from '../../.store/actions/setModalVisibility';
import { setError, setWarning, setSuccess } from '../../.store/actions/setMessages';

import CartTable from './cartTable';

function CartModal({API, getCookie, createFormData, getCartData}) {
  const [comment, setComment] = useState('');

  const cart = useSelector(state => state.cart);
  const userInfo = useSelector(state => state.userInfo);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = getCookie('accessToken');
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

  const submitOrder = async function(evt) {
    evt.preventDefault();

    if(!isLoggedIn) {
      dispatch(setWarning('You must be logged in to submit the order.'));
    } 
    else if(!userInfo.name || !userInfo.email || !userInfo.phone) {
      dispatch(setWarning(
        'You must provide all the necessary information in your account settings.'
      ));
    }
    else {
      const formDataObj = {
        user_id: userInfo.id,
        comment: comment,
        total: totalPrice,
        created_at: new Date().toLocaleString(),
      }
      const formData = createFormData(formDataObj);

      try {
        await axios.post(`${API}/orders`, formData, {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }, { validateStatus: function() { return true; } })
        .then((res) => { let status = res.status;
          if(status === 201) {
            setComment(''); navigate('/'); getCartData();
            return dispatch(setSuccess(res.data.message));
          } else return dispatch(setError(res.data.message));
        }).catch((err) => {
          return dispatch(setError(err));
        });
      } catch {
        dispatch(setWarning("Internal Server Error. Try again later."));
      }
    }

    return dispatch(setModalVisibility(false));
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
          <form className="modal-form" onSubmit={(e) => submitOrder(e)}>
            <div className="comment-input">
              <label htmlFor="modal-input">Comment (optional):</label>
              <textarea id="modal-input" rows="2" cols="33" maxLength="80" 
                onChange={(e) => setComment(e.target.value)}/>
            </div>
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