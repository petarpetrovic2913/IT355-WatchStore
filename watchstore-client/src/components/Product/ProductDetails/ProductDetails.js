import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProduct } from '../../../store/actions/productsActions';
import { Item, Header } from 'semantic-ui-react';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      unitInStock: '',
      productImage: '',
      errors: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProduct(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    this.setState({
      productName: nextProps.product.productName,
      productDescription: nextProps.product.productDescription,
      productPrice: nextProps.product.productPrice,
      unitInStock: nextProps.product.unitInStock,
      productImage: nextProps.product.productImage
    });
  }

  render() {
    const {
      productName,
      productDescription,
      productPrice,
      unitInStock,
      productImage
    } = this.state;

    return (
      <Fragment>
        <Item>
          <Item.Image
            size="large"
            src={
              productImage ||
              'https://react.semantic-ui.com/images/wireframe/image.png'
            }
          />

          <Item.Content>
            <Item.Header as="a">
              <Header size="medium">{productName}</Header>
            </Item.Header>
            <Item.Meta>
              <Header size="tiny">Price: </Header>
              {productPrice}
            </Item.Meta>
            <Item.Description>
              <Header size="tiny">Description: </Header>
              {productDescription}
            </Item.Description>
            <Item.Extra>
              <Header size="tiny">Unit in stock: </Header>
              {unitInStock}
            </Item.Extra>
          </Item.Content>
        </Item>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  product: state.storeProducts.product
});

const mapDispatchToProps = { getProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetails));
