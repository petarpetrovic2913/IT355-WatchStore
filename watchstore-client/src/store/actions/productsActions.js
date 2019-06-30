import axios from 'axios';
import {
  GET_ERRORS,
  GET_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCT,
  GET_FILTERED_PRODUCTS
} from './actionTypes';

export const addProduct = product => {
  return async dispatch => {
    try {
      await axios.post(
        'http://localhost:8080/admin/productmanagement/addproduct',
        product
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

export const getAllProducts = () => {
  return async dispatch => {
    const response = await axios.get(
      'http://localhost:8080/products/allproducts'
    );
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response.data
    });
  };
};

export const getProducts = pageNum => {
  return async dispatch => {
    const response = await axios.get(
      `http://localhost:8080/products/all?pagenum=${pageNum}`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: response.data.content
    });
  };
};

export const getProduct = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${id}`);
      dispatch({
        type: GET_PRODUCT,
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

export const updateProduct = (product, id) => {
  return async dispatch => {
    try {
      await axios.put(
        `http://localhost:8080/admin/productmanagement/edit/${id}`,
        product
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

export const deleteProduct = id => {
  return async dispatch => {
    if (window.confirm('Are you sure that you want to delete this product?')) {
      await axios.delete(
        `http://localhost:8080/admin/productmanagement/delete/${id}`
      );
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      });
    }
  };
};

export const getFilteredProducts = (
  priceLower,
  priceUpper,
  unitInStock,
  categoryOne,
  categoryTwo,
  categoryThree
) => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `http://localhost:8080/products/search?${categoryOne &&
          `categoryOne=${categoryOne}`}&${categoryTwo &&
          `categoryTwo=${categoryTwo}`}&${categoryThree &&
          `categoryThree=${categoryThree}`}&priceFrom=${priceLower}&priceLimit=${priceUpper}&unitInStock=${unitInStock}`
      );
      dispatch({
        type: GET_FILTERED_PRODUCTS,
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };
};
