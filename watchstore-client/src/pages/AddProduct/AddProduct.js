import React from 'react';
import AddProductComponent from '../../components/Product/AddProduct/AddProduct';
import Title from '../../components/Title/Title';
import './AddProduct.css';

const AddProduct = () => {
  return (
    <div className="addProductWrapper">
      <Title title="Add New Product" />
      <AddProductComponent />
    </div>
  );
};

export default AddProduct;
