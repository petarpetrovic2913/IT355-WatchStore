import React, { Fragment } from 'react';
import UpdateProductComponent from '../../components/Product/UpdateProduct/UpdateProduct';
import Title from '../../components/Title/Title';

const UpdateProduct = () => {
  return (
    <Fragment>
      <Title title="Update Product" />
      <UpdateProductComponent />
    </Fragment>
  );
};

export default UpdateProduct;
