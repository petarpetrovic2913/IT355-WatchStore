import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Table, Header } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCart, checkout } from '../../../store/actions/cartActions';
import CartItem from './CartItem/CartItem';

class CartItems extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      totalPrice: 0
    };
  }

  componentDidMount() {
    this.props.getCart();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        cartItems: nextProps.cart.cartItems,
        totalPrice: nextProps.cart.grandTotal,
        errors: nextProps.errors
      });
    }
  }

  onCheckout = async () => {
    await this.props.checkout();
    if (_.isEmpty(this.state.errors)) {
      this.popupSuccess();
    }
    await this.props.getCart();
  };

  popupSuccess = () => {
    toast.info('You successfully purchased your items!', {
      position: toast.POSITION.TOP_LEFT
    });
  };

  render() {
    let { cartItems, totalPrice, errors } = this.state;
    return (
      <div>
        {cartItems && (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cartItems.map((cartItem, index) => (
                <CartItem key={index} content={cartItem} />
              ))}
            </Table.Body>
          </Table>
        )}
        <Header size="medium">Total cart price: {totalPrice}</Header>
        {errors && <p style={{ color: 'red' }}>{errors.message}</p>}
        <Button color="orange" onClick={this.onCheckout}>
          Checkout
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.storeCart.cart,
  errors: state.errors
});

const mapDispatchToProps = { getCart, checkout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItems);
