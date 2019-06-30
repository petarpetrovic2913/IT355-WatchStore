import axios from 'axios';
import { GET_CATEGORIES, GET_CATEGORY } from '../actions/actionTypes';

export const getCategories = () => {
  return async dispatch => {
    const response = await axios.get(
      `http://localhost:8080/products/categories`
    );
    dispatch({
      type: GET_CATEGORIES,
      payload: response.data
    });
  };
};

export const getCategoryById = id => {
  return async dispatch => {
    const response = await axios.get(
      `http://localhost:8080/products/categories/${id}`
    );
    dispatch({
      type: GET_CATEGORY,
      payload: response.data
    });
  };
};
