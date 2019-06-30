import axios from 'axios';
import { GET_CUSTOMERS, DELETE_CUSTOMER, GET_ERRORS } from './actionTypes';

export const getCustomers = () => {
  return async dispatch => {
    const response = await axios.get(
      'http://localhost:8080/admin/customermanagement/all'
    );
    dispatch({
      type: GET_CUSTOMERS,
      payload: response.data.content
    });
  };
};

export const deleteCustomer = id => {
  return async dispatch => {
    if (window.confirm('Are you sure that you want to delete this product?')) {
      await axios.delete(
        `http://localhost:8080/admin/customermanagement/delete/${id}`
      );
      dispatch({
        type: DELETE_CUSTOMER,
        payload: id
      });
    }
  };
};

export const createCustomer = customer => {
  return async dispatch => {
    try {
      await axios.post('http://localhost:8080/customers/register', customer);
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

export const enableCustomer = id => {
  return async dispatch => {
    await axios.get(
      `http://localhost:8080/admin/customermanagement/enable/${id}`
    );
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  };
};

export const disableCustomer = id => {
  return async dispatch => {
    await axios.get(
      `http://localhost:8080/admin/customermanagement/disable/${id}`
    );
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  };
};
