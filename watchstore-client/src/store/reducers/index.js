import { combineReducers } from 'redux';
import { errorReducer } from './errorReducer';
import { productsReducer } from './productsReducer';
import { customersReducer } from './customersReducer';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { shippingAddressReducer } from './shippingAddressReducer';
import { categoryReducer } from './categoryReducer';

export default combineReducers({
  errors: errorReducer,
  storeProducts: productsReducer,
  storeCustomers: customersReducer,
  storeCart: cartReducer,
  storeShippingAddress: shippingAddressReducer,
  storeCategories: categoryReducer,
  security: authReducer
});
