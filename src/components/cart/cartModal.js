import React, { Component } from 'react';
import axios from 'axios';

import CartTable from './cartTable';

const API = "http://api.willberries";

class CartModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: this.props.cart,
    }
  }

  plusCartItem = id => {
    const cart = this.state.cart;
    const newCart = cart.map(good => {
    if(good.id === id && good.count > 0) {
        good.count++;
    }
      return good;
    })
    this.setState({cart: newCart});
  }

  minusCartItem = id => {
    const cart = this.state.cart;
    const newCart = cart.map(good => {
    if(good.id === id && good.count > 1) {
        good.count--;
    }
      return good;
    })
    this.setState({cart: newCart});
  }

  deleteCartItem = id => {
    const cart = this.state.cart;
    const newCart = cart.filter(good => {
      return good.id !== id;
    })
    this.setState({cart: newCart});
  }

  placeOrder() {
    const placeOrderForm = document.querySelector('.modal-form');
    placeOrderForm.onsubmit = () => {
      const cartModal = document.querySelector('#modal-cart');
      const cart = this.state.cart;
      
      const nameField = document.querySelector('.modal-input[name="nameCustomer"]');
      const emailField = document.querySelector('.modal-input[name="emailCustomer"]');
      const phoneField = document.querySelector('.modal-input[name="phoneCustomer"]');

      fetch(`${API}/orders`, {
        method: 'POST',
        body: JSON.stringify({
            cart: cart,
            name: nameField.value,
            email: emailField.value,
            phone: phoneField.value,
          }),
      }).then(() => {
        cartModal.classList.remove('show');
        nameField.value = '';
        emailField.value = '';
        phoneField.value = '';
        this.setState({
          cart: []
        })
      })

      window.pathname.location.href = ''
    }
  }

  render() {
    /* Вычисление общей суммы товаров */
    let totalPrice = 0;
    this.state.cart.forEach(good => {
      const totalItemPrice = +good.price * +good.count;
      totalPrice += totalItemPrice;
    })

    return (
      <div className="overlay" id="modal-cart">
        <div className="modal">
          <header className="modal-header">
            <h2 className="modal-title">Cart</h2>
            <button className="modal-close">x</button>
          </header>
          <div className="cart-wrapper">
            {this.state.cart.length > 0 ? 
              <CartTable 
                API={API}
                cart={this.state.cart} 
                minusCartItem={this.minusCartItem}  
                plusCartItem={this.plusCartItem} 
                deleteCartItem={this.deleteCartItem}
              /> :
              <div id="cart-empty">There is nothing in the cart yet.</div>
            }
          </div>
          {this.state.cart.length > 0 ?
            <form className="modal-form" action="" onSubmit={this.placeOrder}>
              <input
                className="modal-input"
                type="text"
                placeholder="Your Name"
                name="nameCustomer"
                required
              />
              <input
                className="modal-input"
                type="text"
                placeholder="Email"
                name="emailCustomer"
                required
              />
              <input
                className="modal-input"
                type="text"
                placeholder="Phone"
                name="phoneCustomer"
                required
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
}

export default CartModal;