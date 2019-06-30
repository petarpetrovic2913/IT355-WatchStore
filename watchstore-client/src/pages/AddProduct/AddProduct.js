import React, { Fragment } from 'react';
import AddProductComponent from '../../components/Product/AddProduct/AddProduct';
import Title from '../../components/Title/Title';

const AddProduct = () => {
  return (
    <Fragment>
      <Title title="Add Product" />
      <AddProductComponent />
    </Fragment>
  );
};

export default AddProduct;
