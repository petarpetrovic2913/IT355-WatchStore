import axios from 'axios';
import setJWTToken from '../../securityUtils/setJWTToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, GET_ERRORS } from '../actions/actionTypes';

export const login = LoginRequest => {
  return async dispatch => {
    try {
      //post => Login Request
      const res = await axios.post(
        'http://localhost:8080/customers/login',
        LoginRequest
      );

      //extract from res.data
      const { token } = res.data;

      // store the token in the LocalStorage
      localStorage.setItem('jwtToken', token);

      //set out token in header
      setJWTToken(token);

      //decode token on React
      const decoded = jwt_decode(token);

      //dispatch to out SecurityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setJWTToken(false);
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};
