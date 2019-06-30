import { GET_SHIPPING_ADDRESS } from '../actions/actionTypes';

const initialState = {
  shippingAddress: {}
};

export const shippingAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    default:
      return state;
  }
};
