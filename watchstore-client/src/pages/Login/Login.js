import React, { Fragment } from 'react';
import LoginComponent from '../../components/Customer/Login/Login';
import Title from '../../components/Title/Title';

const Login = () => {
  return (
    <Fragment>
      <Title title="Login" />
      <LoginComponent />
    </Fragment>
  );
};

export default Login;
