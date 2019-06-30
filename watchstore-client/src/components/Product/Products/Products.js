import React, { Component, Fragment } from 'react';
import Product from './Product/Product';
import { connect } from 'react-redux';
import { Table, Input, Button } from 'semantic-ui-react';
import {
  getProducts,
  getAllProducts
} from '../../../store/actions/productsActions';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      productsPerPage: [],
      filtered: [],
      pageNum: 0,
      searchParam: '',
      advancedSearch: false
    };
  }

  componentDidMount() {
    this.props.getProducts(0);
    this.props.getAllProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNum !== this.state.pageNum) {
      window.scrollTo(0, 0);
      this.props.getProducts(this.state.pageNum);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      productsPerPage: nextProps.productsPerPage,
      products: nextProps.products,
      filtered: nextProps.products,
      advancedSearch: nextProps.advancedSearch
    });
  }

  handleChange = e => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== '') {
      this.setState({
        searchParam: e.target.value
      });
      currentList = this.state.products;
      newList = currentList.filter(product => {
        const productName = product.productName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return productName.includes(filter);
      });
      this.setState({
        filtered: newList
      });
    } else {
      this.setState({
        searchParam: ''
      });
    }
  };

  prevPage = () => {
    if (this.state.pageNum > 0)
      this.setState({
        pageNum: this.state.pageNum - 1
      });
  };

  nextPage = () => {
    const maxPageNum = Math.ceil(this.state.products.length / 10) - 1;
    if (this.state.pageNum < maxPageNum)
      this.setState({
        pageNum: this.state.pageNum + 1
      });
  };

  render() {
    let {
      filtered,
      pageNum,
      searchParam,
      productsPerPage,
      advancedSearch,
      products
    } = this.state;
    return (
      <Fragment>
        <Input
          icon={{ name: 'search', circular: true, link: true }}
          placeholder="Search..."
          type="text"
          onChange={this.handleChange}
          className="inputSearch"
          style={{ paddingBottom: '15px' }}
        />
        {searchParam && (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Model</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Unit in stock</Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.map((product, index) => (
                <Product key={index} content={product} />
              ))}
            </Table.Body>
          </Table>
        )}
        {!searchParam && !advancedSearch && (
          <div>
            <Button onClick={this.prevPage}>{'<-'}</Button>
            {pageNum}
            <Button onClick={this.nextPage}>{'->'}</Button>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Model</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Unit in stock</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {productsPerPage.map((product, index) => (
                  <Product key={index} content={product} pageNum={pageNum} />
                ))}
              </Table.Body>
            </Table>
            <Button onClick={this.prevPage}>{'<-'}</Button>
            {pageNum}
            <Button onClick={this.nextPage}>{'->'}</Button>
          </div>
        )}
        {advancedSearch && !searchParam && (
          <div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Model</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Unit in stock</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {products.map((product, index) => (
                  <Product key={index} content={product} />
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.storeProducts.products,
  productsPerPage: state.storeProducts.productsPerPage,
  advancedSearch: state.storeProducts.advancedSearch
});

const mapDispatchToProps = { getProducts, getAllProducts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
