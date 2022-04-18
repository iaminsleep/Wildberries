import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setError } from '../.store/actions/setMessages';

import Order from '../components/goods/order';

import '../css/pages/order_manager.css';

function OrderManager({API, getCookie}) {
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async() => {
      const accessToken = getCookie('accessToken');
      if(!accessToken) return false;
      else {
        await axios.get(`${API}/orders`, { 
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then((response) => {
          console.log(response);
          console.log(response.data);
          let status = response.status;
          if(status === 200) {
            dispatch(setOrders(response.data));
          }
          else {
            dispatch(setError(response.data.message));
          }
        });
      }
    }

    getOrders();
  }, []);

  return (
    <React.Fragment>
      {orders.length > 0 ? 
        orders.map(order => {
          <Order key={order.id} orderInfo={order.order_info} 
          orderItems={order.order_items} userInfo={order.user_info}/>
        })
      : <div className="empty-goods-wrapper purple">
          <div id="orders-empty">There are no active orders from users!</div>
        </div>
      }
    </React.Fragment>
  );
}

export default OrderManager;