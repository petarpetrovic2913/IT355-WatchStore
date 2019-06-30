import {
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_FILTERED_PRODUCTS,
  GET_ALL_PRODUCTS
} from '../actions/actionTypes';

const initialState = {
  products: [],
  productsPerPage: [],
  product: {},
  advancedSearch: false
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, productsPerPage: action.payload };

    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload };

    case GET_PRODUCT:
      return { ...state, product: action.payload };

    case UPDATE_PRODUCT:
      return { ...state, product: action.payload };

    case DELETE_PRODUCT:
      return {
        ...state,
        productsPerPage: state.productsPerPage.filter(
          product => product.productId !== action.payload
        )
      };

    case GET_FILTERED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        advancedSearch: true
      };

    default:
      return state;
  }
};
