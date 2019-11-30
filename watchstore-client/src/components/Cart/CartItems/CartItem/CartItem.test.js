import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { CartItem } from './CartItem';

describe('Test CartItem component', () => {
  it('renders without crashing', () => {
    const removeCartItem = jest.fn();
    const getCart = jest.fn();
    const content = {
      product: {
        productName: 'test name'
      },
      totalPrice: 125,
      quantity: 5
    };

    const { container } = render(
      <CartItem
        removeCartItem={removeCartItem}
        getCart={getCart}
        content={content}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should call removeCartItem and getCart on delete', async () => {
    const removeCartItem = jest.fn();
    const getCart = jest.fn();
    const content = {
      cartItemId: 6,
      product: {
        productName: 'test name'
      },
      totalPrice: 125,
      quantity: 5
    };

    const { getByTestId } = render(
      <CartItem
        removeCartItem={removeCartItem}
        getCart={getCart}
        content={content}
      />
    );
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(removeCartItem).toHaveBeenCalledWith(6);
    await wait(() => expect(getCart).toHaveBeenCalled());
  });
});
