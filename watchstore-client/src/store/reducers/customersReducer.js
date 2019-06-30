import { GET_CUSTOMERS, DELETE_CUSTOMER } from '../actions/actionTypes';

const initialState = {
  customers: []
};

export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return { ...state, customers: action.payload };

    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer.customerId !== action.payload
        )
      };

    default:
      return state;
  }
};
