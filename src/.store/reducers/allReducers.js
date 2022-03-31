import goodsReducer from './goodsReducer';
import cartReducer from './cartReducer';
import loggedReducer from './loggedReducer';
import { errorReducer, warningReducer, successReducer } from './messageReducers';
import modalReducer from './modalReducer';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
  goods: goodsReducer,
  cart: cartReducer,
  isLoggedIn: loggedReducer,
  errorMessage: errorReducer,
  warningMessage: warningReducer,
  successMessage: successReducer,
  isModalVisible: modalReducer,
});

export default allReducers;