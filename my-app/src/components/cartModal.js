import React from 'react';

function CartModal() {
  return (
    <div className="overlay" id="modal-cart">
      <div className="modal">
        <header className="modal-header">
          <h2 className="modal-title">Cart</h2>
          <button className="modal-close">x</button>
        </header>
        <table className="cart-table">
          <colgroup>
            <col className="col-goods" />
            <col className="col-price" />
            <col className="col-minus" />
            <col className="col-qty" />
            <col className="col-plus" />
            <col className="col-total-price" />
            <col className="col-delete" />
          </colgroup>
          <thead>
            <tr>
              <th>Good(s)</th>
              <th>Price</th>
              <th colspan="3">Qty.</th>
              <th colspan="2">Total</th>
            </tr>
          </thead>
          <tbody className="cart-table__goods"></tbody>
          <tfoot>
            <tr>
              <th colspan="5">Total:</th>
              <th className="card-table__total" colspan="2">0$</th>
            </tr>
          </tfoot>
        </table>
        <form className="modal-form" action="">
          <input
            className="modal-input"
            type="text"
            placeholder="Имя"
            name="nameCustomer"
          />
          <input
            className="modal-input"
            type="text"
            placeholder="Телефон"
            name="phoneCustomer"
          />
          <button className="button cart-buy" type="submit">
            <span className="button-text">Checkout</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartModal;