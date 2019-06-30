import axios from 'axios';
import { GET_ERRORS, GET_SHIPPING_ADDRESS } from './actionTypes';

export const addShippingAddress = shippingAddress => {
  return async dispatch => {
    try {
      await axios.post(
        'http://localhost:8080/customer/add/shipping_address',
        shippingAddress
      );
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

export const getShippingAddress = () => {
  return async dispatch => {
    const response = await axios.get(
      `http://localhost:8080/customer/shipping_address`
    );
    dispatch({
      type: GET_SHIPPING_ADDRESS,
      payload: response.data
    });
  };
};

export const editShippingAddress = shippingAddress => {
  return async dispatch => {
    try {
      await axios.put(
        'http://localhost:8080/customer/edit/shipping_address',
        shippingAddress
      );
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    }
  };
};
