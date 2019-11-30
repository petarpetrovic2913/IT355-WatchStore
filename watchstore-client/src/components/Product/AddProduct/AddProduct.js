import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import _ from 'lodash';
import { addProduct } from '../../../store/actions/productsActions';
import {
  getCategories,
  getCategoryById
} from '../../../store/actions/categoryActions';
import './AddProduct.css';

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      unitInStock: '',
      categories: [],
      checkedCategories: [],
      category: {},
      errors: null
    };
  }

  componentDidMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categories: nextProps.categories,
      category: nextProps.category,
      errors: nextProps.errors
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    let newProduct = {
      productName: this.state.productName,
      productDescription: this.state.productDescription,
      productPrice: this.state.productPrice,
      unitInStock: this.state.unitInStock,
      categories: this.state.checkedCategories
    };
    await this.props.addProduct(newProduct);
    if (_.isEmpty(this.state.errors)) this.props.history.push('/');
  };

  onClick = async e => {
    const id = e.target.id;

    if (e.target.checked) {
      await this.props.getCategoryById(id);
      this.setState({
        checkedCategories: [
          ...this.state.checkedCategories,
          this.state.category
        ]
      });
    } else {
      const newCheckedCategories = this.state.checkedCategories.filter(
        category => category.categoryId !== id
      );
      this.setState({
        checkedCategories: newCheckedCategories
      });
    }
  };

  render() {
    const { errors, categories } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Product Name</label>
          <input
            type="text"
            placeholder=""
            name="productName"
            defaultValue={this.state.productName}
            onChange={this.onChange}
          />
          {errors && <p style={{ color: 'red' }}>{errors.productName}</p>}
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
        {categories &&
          categories.map((category, index) => {
            return (
              <Form.Field key={index} className="checkboxForm">
                <input
                  type="checkbox"
                  id={category.categoryId}
                  onClick={this.onClick}
                  value={category.categoryId}
                />
                <span className="categoryLabel">{category.categoryName}</span>
              </Form.Field>
            );
          })}
        <Button type="submit">Add Product</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.storeCategories.categories,
  category: state.storeCategories.category,
  errors: state.errors
});

const mapDispatchToProps = { addProduct, getCategories, getCategoryById };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProduct));
