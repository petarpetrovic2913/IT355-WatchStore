import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { getFilteredProducts } from '../../store/actions/productsActions';
import { getCategories } from '../../store/actions/categoryActions';
import './Sidebar.css';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      priceDown: '',
      priceUpper: '',
      unitInStock: '',
      categories: [],
      category: {},
      checkedCategories: [],
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
    this.setState({
      category: e.target.id
    });
  };

  onChangeUnit = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.getFilteredProducts(
      this.state.priceDown,
      this.state.priceUpper,
      this.state.unitInStock,
      ...this.state.checkedCategories
    );
  };

  onClick = async e => {
    const categoryName = e.target.name;

    if (e.target.checked) {
      this.setState({
        checkedCategories: [...this.state.checkedCategories, categoryName]
      });
    } else {
      const newCheckedCategories = this.state.checkedCategories.filter(
        category => {
          return category !== categoryName;
        }
      );
      this.setState({
        checkedCategories: newCheckedCategories
      });
    }
  };

  render() {
    const { categories, errors } = this.state;
    let routeCondition = this.props.location.pathname === '/';
    return (
      routeCondition && (
        <div className="sidebarWrapper">
          <Form onSubmit={this.onSubmit}>
            {categories &&
              categories.map((category, index) => {
                return (
                  <Form.Field key={index}>
                    <input
                      type="checkbox"
                      onClick={this.onClick}
                      value={category.categoryId}
                      name={category.categoryName}
                    />
                    <label>{category.categoryName}</label>
                  </Form.Field>
                );
              })}
            <Form.Field>
              <label>Price Down</label>
              <input
                type="text"
                name="priceDown"
                value={this.state.priceDown}
                onChange={this.onChangeUnit}
              />
            </Form.Field>
            <Form.Field>
              <label>Price Upper</label>
              <input
                type="text"
                name="priceUpper"
                value={this.state.priceUpper}
                onChange={this.onChangeUnit}
              />
            </Form.Field>
            <Form.Field>
              <label>Unit in stock</label>
              <input
                type="text"
                name="unitInStock"
                value={this.state.unitInStock}
                onChange={this.onChangeUnit}
              />
            </Form.Field>
            {errors && <p style={{ color: 'red' }}>{errors.message}</p>}
            <Form.Field>
              <Button type="submit">Submit</Button>
            </Form.Field>
          </Form>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  categories: state.storeCategories.categories,
  errors: state.errors
});

const mapDispathToProps = { getFilteredProducts, getCategories };

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(Sidebar));
