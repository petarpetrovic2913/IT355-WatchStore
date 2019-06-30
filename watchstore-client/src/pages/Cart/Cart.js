import React, { Fragment } from 'react';
import CartItems from '../../components/Cart/CartItems/CartItems';
import Title from '../../components/Title/Title';
import ShippingAddress from '../../components/Cart/ShippingAddress/ShippingAddress';

const Cart = () => {
  return (
    <Fragment>
      <Title title="Cart" />
      <ShippingAddress />
      <CartItems />
    </Fragment>
  );
};

export default Cart;
