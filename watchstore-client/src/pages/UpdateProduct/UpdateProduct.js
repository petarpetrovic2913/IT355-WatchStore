import React from 'react';
import UpdateProductComponent from '../../components/Product/UpdateProduct/UpdateProduct';
import Title from '../../components/Title/Title';
import './UpdateProduct.css';

const UpdateProduct = () => {
  return (
    <div className="updateWrapper">
      <Title title="Update Product" />
      <UpdateProductComponent />
    </div>
  );
};

export default UpdateProduct;
