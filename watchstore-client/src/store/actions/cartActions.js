import axios from 'axios';
import { GET_ERRORS, GET_CART, DELETE_CART_ITEM } from '../actions/actionTypes';

export const addToCart = (productId, quantity) => {
  return async dispatch => {
    await axios.post(
      `http://localhost:8080/customer/cart/add/${productId}?quantity=${quantity}`
    );

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  };
};

export const getCart = () => {
  return async dispatch => {
    const response = await axios.get('http://localhost:8080/customer/cart');
    dispatch({
      type: GET_CART,
      payload: response.data
    });
  };
};

export const removeCartItem = cartItemId => {
  return async dispatch => {
    await axios.delete(
      `http://localhost:8080/customer/cart/remove/${cartItemId}`
    );
    dispatch({
      type: DELETE_CART_ITEM,
      payload: cartItemId
    });
  };
};

export const checkout = () => {
  return async dispatch => {
    try {
      await axios.get(`http://localhost:8080/customer/order`);

      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  };
};
