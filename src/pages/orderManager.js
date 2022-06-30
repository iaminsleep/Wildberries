import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setError } from '../.store/actions/setMessages';
import OrderItem from '../components/goods/orderItem';
import '../css/pages/order_manager.css';

function OrderManager({API, getCookie}) {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const getOrders = async() => {
      if(!accessToken) return false;
      else {
        await axios.get(`${API}/orders`, { 
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then((response) => {
          let status = response.status;
          if(status === 200) {
            setOrders(response.data);
            setLoaded(true);
          }
          else {
            dispatch(setError(response.data.message));
          }
        });
      }
    }

    if(!isLoaded) {
      getOrders();
    }
  }, [isLoaded, API, dispatch, accessToken]);

  return (
    <React.Fragment>
      <section className="orders">
        {orders.length > 0 ? 
          orders.map(order => {
            return(
              <div key={order.order_info.id} className="order">
                <h2 className="order-number">Order &#8470; {order.order_info.id}</h2>
                <h2 className="order-title">Details</h2>
                <div className="order-info">
                  <p className="order-info-description">Created: {order.order_info.created_at}</p>
                  <p className="order-info-description">Comment:&nbsp;
                    <span className={"comment" + (order.order_info.comment === '' ? " empty" : "")}>
                      {order.order_info.comment !== '' 
                      ? order.order_info.comment 
                      : 'The user chose not to leave a comment'}
                    </span>
                  </p>
                </div>
                <h2 className="order-title">User Info</h2>
                <div className="user-info">
                  <p className="user-info-description">Name: {order.user_info.name}</p>
                  <p className="user-info-description">Email: {order.user_info.email}</p>
                  <p className="user-info-description">Phone:&nbsp;
                    <a href={`tel:+${order.user_info.phone}`}>
                      {order.user_info.phone}
                    </a>
                  </p>
                </div>
                <h2 className="order-title">Products:</h2>
                <table className="cart-table" id="order-table">
                  <colgroup>
                    <col className="col-image"/>
                    <col className="col-name"/>
                    <col className="col-price"/>
                    <col className="col-qty"/>
                    <col className="col-total-price"/>
                    <col className="col-delete"/>
                  </colgroup>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty.</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="cart-table__goods">
                    {order.order_items.map(orderItem => 
                      <OrderItem
                        key={orderItem.id} img={orderItem.img} name={orderItem.name} price={orderItem.price} 
                        quantity={orderItem.quantity} total={orderItem.price * orderItem.quantity} API={API}
                      />
                    )}
                  </tbody>
                </table>
                <p className="order-info-description total" id="order-total">Total: ${order.order_info.total}</p>
              </div>
            )
          })
        : <div className="empty-goods-wrapper purple">
            <div id="orders-empty">There are no active orders from users!</div>
          </div>
        }
      </section>
    </React.Fragment>
  );
}

export default OrderManager;