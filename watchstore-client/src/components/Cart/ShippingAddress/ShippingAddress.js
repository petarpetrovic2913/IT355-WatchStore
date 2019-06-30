import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  addShippingAddress,
  getShippingAddress,
  editShippingAddress
} from '../../../store/actions/shippingAddressActions';
import { Button, Form } from 'semantic-ui-react';
import './ShippingAddress.css';

class ShippingAddress extends Component {
  constructor() {
    super();
    this.state = {
      streetName: '',
      apartmentNumber: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      errors: {},
      formVisible: false,
      hasAddress: false
    };
  }

  componentDidMount() {
    this.props.getShippingAddress();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.shippingAddress))
      this.setState({
        streetName: nextProps.shippingAddress.streetName,
        apartmentNumber: nextProps.shippingAddress.apartmentNumber,
        city: nextProps.shippingAddress.city,
        state: nextProps.shippingAddress.state,
        country: nextProps.shippingAddress.country,
        zipCode: nextProps.shippingAddress.zipCode,
        hasAddress: true
      });

    this.setState({
      errors: nextProps.errors
    });
  }

  openShippingAddressForm = () => {
    this.setState({ formVisible: !this.state.formVisible });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    let newShippingAddress = {
      streetName: this.state.streetName,
      apartmentNumber: this.state.apartmentNumber,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipCode: this.state.zipCode
    };
    if (this.state.hasAddress) {
      await this.props.editShippingAddress(newShippingAddress);
    } else {
      await this.props.addShippingAddress(newShippingAddress);
    }
  };

  render() {
    const errors = this.state.errors;
    return (
      <div className="shippingAddress">
        <Button onClick={this.openShippingAddressForm}>Shipping Address</Button>
        {this.state.formVisible && (
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Street Name</label>
              <input
                type="text"
                placeholder=""
                name="streetName"
                value={this.state.streetName}
                onChange={this.onChange}
              />
            </Form.Field>
            <p style={{ color: 'red' }}>{errors && errors.streetName}</p>
            <Form.Field>
              <label>Apartment number</label>
              <input
                type="text"
                placeholder=""
                name="apartmentNumber"
                value={this.state.apartmentNumber}
                onChange={this.onChange}
              />
            </Form.Field>
            <p style={{ color: 'red' }}>{errors && errors.apartmentNumber}</p>
            <Form.Field>
              <label>City</label>
              <input
                type="text"
                placeholder=""
                name="city"
                value={this.state.city}
                onChange={this.onChange}
              />
            </Form.Field>
            <p style={{ color: 'red' }}>{errors && errors.city}</p>
            <Form.Field>
              <label>State</label>
              <input
                type="text"
                placeholder=""
                name="state"
                value={this.state.state}
                onChange={this.onChange}
              />
            </Form.Field>
            <p style={{ color: 'red' }}>{errors && errors.state}</p>
            <Form.Field>
              <label>Country</label>
              <input
                type="text"
                placeholder=""
                name="country"
                value={this.state.country}
                onChange={this.onChange}
              />
            </Form.Field>
            <p style={{ color: 'red' }}>{errors && errors.country}</p>
            <Form.Field>
              <label>ZipCode</label>
              <input
                type="text"
                placeholder=""
                name="zipCode"
                value={this.state.zipCode}
                onChange={this.onChange}
              />
            </Form.Field>
            <p style={{ color: 'red' }}>{errors && errors.zipCode}</p>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shippingAddress: state.storeShippingAddress.shippingAddress,
  errors: state.errors
});
const mapDispatchToProps = {
  addShippingAddress,
  getShippingAddress,
  editShippingAddress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingAddress);
