import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import _ from 'lodash';
import {
  updateProduct,
  getProduct
} from '../../../store/actions/productsActions';

class UpdateProduct extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      productName: '',
      productDescription: '',
      productPrice: '',
      unitInStock: '',
      errors: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProduct(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.product.productId,
      productName: nextProps.product.productName,
      productDescription: nextProps.product.productDescription,
      productPrice: nextProps.product.productPrice,
      unitInStock: nextProps.product.unitInStock,
      errors: nextProps.errors
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const id = this.state.id;
    let newProduct = {
      productName: this.state.productName,
      productDescription: this.state.productDescription,
      productPrice: this.state.productPrice,
      unitInStock: this.state.unitInStock
    };
    await this.props.updateProduct(newProduct, id);
    if (_.isEmpty(this.state.errors)) this.props.history.push('/');
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            defaultValue={this.state.productName}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Product description</label>
          <input
            type="text"
            placeholder=""
            name="productDescription"
            defaultValue={this.state.productDescription}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Product price</label>
          <input
            type="text"
            placeholder=""
            name="productPrice"
            defaultValue={this.state.productPrice}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Unit in stock</label>
          <input
            type="text"
            placeholder=""
            name="unitInStock"
            defaultValue={this.state.unitInStock}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button type="submit">Update Product</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  product: state.storeProducts.product
});

const mapDispatchToProps = { getProduct, updateProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateProduct));
