import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import store from './.store/store';
import { Provider } from 'react-redux';

import './css/bootstrap-grid.min.css';
import './css/style.css';
import './css/swiper-bundle.min.css';
import './css/cart.css';
import './css/media.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>, document.getElementById('root')
);
