import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Table } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  deleteProduct,
  getProducts
} from '../../../../store/actions/productsActions';
import { addToCart } from '../../../../store/actions/cartActions';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0
    };
  }

  onDelete = () => {
    const id = this.props.content.productId;
    this.props.deleteProduct(id);
  };

  onAddToCart = async () => {
    const id = this.props.content.productId;
    const { perPage } = this.props;
    const amount = this.state.amount;
    if (amount > 0) await this.props.addToCart(id, amount);
    if (perPage) await this.props.getProducts(perPage);
    if (this.state.amount === 0) this.popupError();
    else this.popupSuccess();
  };

  addItem = () => {
    if (this.state.amount < this.props.content.unitInStock)
      this.setState({
        amount: this.state.amount + 1
      });
  };

  removeItem = () => {
    if (this.state.amount > 0)
      this.setState({
        amount: this.state.amount - 1
      });
  };

  popupSuccess = () => {
    toast.info('You added a product to the cart!', {
      position: toast.POSITION.TOP_LEFT
    });
  };

  popupError = () => {
    toast.error('You must select amount!', {
      position: toast.POSITION.TOP_LEFT
    });
  };

  render() {
    const {
      productId,
      productName,
      productDescription,
      productPrice,
      unitInStock,
      categories
    } = this.props.content;
    const { isAuthenticated, role } = this.props.security;
    const admin = isAuthenticated && role === 'ROLE_ADMIN';
    const user = isAuthenticated && role === 'ROLE_USER';
    return (
      <Table.Row>
        <Table.Cell width={3}>{productName}</Table.Cell>
        <Table.Cell width={3}>
          {categories.length
            ? categories.map((category, index) => (
                <p key={index}>{category.categoryName}</p>
              ))
            : null}
        </Table.Cell>
        <Table.Cell width={3}>{productDescription}</Table.Cell>
        <Table.Cell width={3}>{productPrice}</Table.Cell>
        <Table.Cell width={3}>{unitInStock}</Table.Cell>
        <Table.Cell width={2}>
          <Link to={`/details/${productId}`}>
            <Button color="yellow">Details</Button>
          </Link>
        </Table.Cell>
        {admin && (
          <>
            <Table.Cell width={3}>
              <Link to={`/update/${productId}`}>
                <Button color="blue">Update</Button>
              </Link>
            </Table.Cell>
            <Table.Cell width={3}>
              <Button onClick={this.onDelete} color="red">
                Delete
              </Button>
            </Table.Cell>
          </>
        )}
        {user && (
          <>
            <Table.Cell width={3}>
              <Button color="blue" onClick={this.onAddToCart}>
                Add To Cart
              </Button>
            </Table.Cell>
            <Table.Cell width={3}>
              <Button onClick={this.addItem}>+</Button>
            </Table.Cell>
            <Table.Cell width={3}>
              <Button onClick={this.removeItem}>-</Button>
            </Table.Cell>
            <Table.Cell width={3}>{this.state.amount}</Table.Cell>
          </>
        )}
      </Table.Row>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security
});
const mapDispatchToProps = { deleteProduct, addToCart, getProducts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
