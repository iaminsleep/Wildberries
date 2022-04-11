import goodsReducer from './goodsReducer';
import cartReducer from './cartReducer';
import loggedReducer from './loggedReducer';
import { errorReducer, warningReducer, successReducer } from './messageReducers';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
  goods: goodsReducer,
  cart: cartReducer,
  isLoggedIn: loggedReducer,
  errorMessage: errorReducer,
  warningMessage: warningReducer,
  successMessage: successReducer,
  isModalVisible: modalReducer,
  userInfo: userReducer,
});

export default allReducers;