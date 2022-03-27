import goodsReducer from './goodsReducer';
import cartReducer from './cartReducer';
import loggedReducer from './loggedReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  goods: goodsReducer,
  cart: cartReducer,
  isLoggedIn: loggedReducer,
});

export default allReducers;