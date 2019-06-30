import { SET_CURRENT_USER } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  role: '',
  customerName: ''
};

// const booleanActionPayload = payload => {
//   if (payload) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Boolean(action.payload),
        role: action.payload.role[0].authority,
        customerName: action.payload.customerName
      };

    default:
      return state;
  }
};
