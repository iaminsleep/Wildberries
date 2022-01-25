import React from 'react';

import cart from '../../img/cart.svg';

function GoodItem({API, addToCart, id, name, description, price, img, label}) {
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="goods-card">
        <a className="goods-link" href="./about">
            <span className={`label ${label ? "" : 'd-none'}`}>{label}</span>
            <img src={`${API}/img/goods/${img}`} alt={`${name}`} className="goods-image"/>
            <h3 className="goods-title">{name}</h3>
            <p className="goods-description">{description}</p>
        </a>
        <button className="button goods-card-btn add-to-cart" data-id={`${id}`} onClick={(evt) => addToCart(evt, id)}>
            <span id="button-price">${price}</span>
            <img src={cart} className="cart-icon" alt="cart"/>
        </button>
      </div>   
    </div>  
  );
}

export default GoodItem;