import React, { Fragment } from 'react';
import Products from '../../components/Product/Products/Products';
import Title from '../../components/Title/Title';

const HomePage = () => {
  return (
    <Fragment>
      <Title title="Watch Store" />
      <Products />
    </Fragment>
  );
};

export default HomePage;
