import React, { Fragment } from 'react';
import Title from '../../components/Title/Title';
import ProductDetailsComponent from '../../components/Product/ProductDetails/ProductDetails';

const ProductDetalis = () => {
  return (
    <Fragment>
      <Title title="Product Details" />
      <ProductDetailsComponent />
    </Fragment>
  );
};

export default ProductDetalis;
