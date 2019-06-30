import React, { Fragment } from 'react';
import CustomersComponent from '../../components/Customer/Customers/Customers';
import Title from '../../components/Title/Title';

const Customers = () => {
  return (
    <Fragment>
      <Title title="Customers" />
      <CustomersComponent />
    </Fragment>
  );
};

export default Customers;
