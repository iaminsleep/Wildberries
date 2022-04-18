import React, { useState } from 'react';

import OrderItem from './orderItem';

function Order({orderInfo, orderItems, userInfo}) {
  return (
    <div className="order">
      <h2 className="order-title">Order Details</h2>
      <div className="order-info">
        <p className="order-info-description">Created: {orderInfo.created_at}</p>
        <p className="order-info-description">Comment: {orderInfo.comment}</p>
      </div>
      <h2 className="order-title">Информация о пользователе</h2>
      <div className="user-info">
        <p className="user-info-description">Имя: {userInfo.name}</p>
        <p className="user-info-description">Почта: {userInfo.email}</p>
        <p className="user-info-description">Телефон: {userInfo.phone}</p>
      </div>
      <h2 className="order-title">Товары:</h2>
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
          {orderItems.map(orderItem => 
            <OrderItem
              key={orderItem.id} img={orderItem.img} name={orderItem.name} price={orderItem.price} 
              quantity={orderItem.quantity} total={orderItem.price * orderItem.quantity}
            />
          )}
        </tbody>
      </table>
      <p className="total">Total: {orderInfo.total}</p>
    </div> 
  );
}

export default Order;