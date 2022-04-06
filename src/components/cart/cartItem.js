import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setError, setWarning } from '../../.store/actions/setMessages';
import setCartItems from '../../.store/actions/setCartItems';

const CartItem = ({API, img, name, price, quantity, id, createFormData, accessToken}) => {
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const [totalItemPrice, setTotalItemPrice] = useState(0);

  useEffect(() => {
    const countTotalPrice = () => {
      let totalItemPrice = +price * +quantity;
      setTotalItemPrice(totalItemPrice);
    }
    countTotalPrice();
  }, [price, quantity]);

  const saveInDatabase = (formDataObj) => {
    const formData = createFormData(formDataObj);
    try {
      axios.post(`${API}/cart_items`, formData, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }, { validateStatus: function() { return true; } })
      .then((res) => {
        if(res.status !== 200) return dispatch(setError(res.data.message));
      }).catch((err) => { return dispatch(setError(err)); });
    } catch { 
      return dispatch(setWarning("Internal Server Error. Try later."));
    }
  }
  
  const plusCartItem = id => {
    const newCart = cart.map(good => {
      if(good.id === id && good.quantity > 0) {
        good.quantity++;
        quantity = good.quantity;
        return good;
      } else return good;
    });
    dispatch(setCartItems(newCart));
    if(isLoggedIn) {
      const formDataObj = { 
        id: id, 
        quantity: quantity, 
        req: 'change' 
      };
      return saveInDatabase(formDataObj);
    }
  }

  const minusCartItem = id => {
    const newCart = cart.map(good => {
      if(good.id === id && good.quantity > 1) {
        good.quantity--;
        quantity = good.quantity;
        return good;
      } else return good; 
    });
    dispatch(setCartItems(newCart));
    if(isLoggedIn) {
      const formDataObj = { 
        id: id,
        quantity: quantity, 
        req: 'change' 
      };
      return saveInDatabase(formDataObj);
    } 
  }

  const deleteCartItem = id => {
    const newCart = cart.filter(good => {
      return good.id !== id;
    });
    if(isLoggedIn) {
      const formDataObj = { 
        id: id, 
        req: 'delete' 
      };
      saveInDatabase(formDataObj);
    }
    return dispatch(setCartItems(newCart));
  }

  return (
    <tr>
      <td className="w-10"><img src={`${API}/img/goods/${img}`} alt={`${name}`}/></td>
      <td className="w-100">{name}</td>
      <td>${price}</td>
      <td><button className="cart-btn-minus" onClick={() => minusCartItem(id)}>-</button></td>
      <td>{quantity}</td>
      <td><button className="cart-btn-plus" onClick={() => plusCartItem(id)}>+</button></td>
      <td>${totalItemPrice}</td>
      <td><button className="cart-btn-delete" onClick={() => deleteCartItem(id)}>x</button></td>
    </tr> 
  );
}

export default CartItem;