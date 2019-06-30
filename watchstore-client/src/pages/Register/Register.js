import React, { Fragment } from 'react';
import RegisterComponent from '../../components/Customer/Register/Register';
import Title from '../../components/Title/Title';

const Register = () => {
  return (
    <Fragment>
      <Title title="Register" />
      <RegisterComponent />
    </Fragment>
  );
};

export default Register;
