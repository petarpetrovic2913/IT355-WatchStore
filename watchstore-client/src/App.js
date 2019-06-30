import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import './App.css';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Register from './pages/Register/Register';
import AddProduct from './pages/AddProduct/AddProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import store from './store';
import Customers from './pages/Customers/Customers';
import Login from './pages/Login/Login';
import jwt_decode from 'jwt-decode';
import { logout } from './store/actions/authActions';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './store/actions/actionTypes';
import Cart from './pages/Cart/Cart';
import UserSecuredRoute from './securityUtils/UserSecuredRoute';
import AdminSecuredRoute from './securityUtils/AdminSecureRoute';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });
  const currentTime = Date.now() / 1000;
  // handle tho logout
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href('/');
  }
}

toast.configure();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            {
              // Public Routes
            }
            <Route exact path="/" component={HomePage} />
            <Route exact path="/details/:id" component={ProductDetails} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              // Private Routes
            }

            <Switch>
              <UserSecuredRoute exact path="/cart" component={Cart} />
              <AdminSecuredRoute
                exact
                path="/customers"
                component={Customers}
              />
              <AdminSecuredRoute exact path="/add" component={AddProduct} />
              <AdminSecuredRoute
                exact
                path="/update/:id"
                component={UpdateProduct}
              />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
