import { GET_CART, DELETE_CART_ITEM } from '../actions/actionTypes';

const initialState = {
  cart: {}
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CART_ITEM:
      return {
        cart: {
          ...state.cart,
          cartItems: state.cart.cartItems.filter(
            cartItem => cartItem.cartItemId !== action.payload
          )
        }
      };

    case GET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
