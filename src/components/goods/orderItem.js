import React from 'react';

function OrderItem({API, img, price, quantity, name, total}) {
  return (
    <tr>
      <td className="w-8"><img src={`${API}/img/goods/${img}`} alt={`${name}`}/></td>
      <td className="w-100">{name}</td>
      <td>${price}</td>
      <td>{quantity}</td>
      <td>${total}</td>
    </tr> 
  );
}

export default OrderItem;