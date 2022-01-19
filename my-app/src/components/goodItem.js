import React from 'react';

function GoodItem({API, id, name, description, price, img, label}) {
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="goods-card">
        <a className="goods-link" href="./goods">
            <span className={`label ${label ? "" : 'd-none'}`}>{label}</span>
            <img src={`${API}/img/goods/${img}`} alt={`${name}`} className="goods-image"/>
            <h3 className="goods-title">{name}</h3>
            <p className="goods-description">{description}</p>
        </a>
        <button className="button goods-card-btn add-to-cart" data-id={`${id}`}>
            <span className="button-price">${price}</span>
        </button>
      </div>   
    </div>  
  );
}

export default GoodItem;