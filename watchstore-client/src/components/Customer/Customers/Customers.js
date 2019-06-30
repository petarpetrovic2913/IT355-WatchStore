import React, { Component, Fragment } from 'react';
import Customer from './Customer/Customer';
import { connect } from 'react-redux';
import { Table, Input } from 'semantic-ui-react';
import { getCustomers } from '../../../store/actions/customersActions';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      filtered: []
    };
  }

  componentDidMount() {
    this.props.getCustomers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        customers: nextProps.customers,
        filtered: nextProps.customers
      });
    }
  }

  handleChange = e => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== '') {
      currentList = this.state.customers;
      newList = currentList.filter(customer => {
        const customerName = customer.customerName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return customerName.includes(filter);
      });
    } else {
      newList = this.state.customers;
    }
    this.setState({
      filtered: newList
    });
  };

  render() {
    let { filtered } = this.state;
    return (
      <Fragment>
        <Input type="text" placeholder="Search" onChange={this.handleChange} />
        {filtered.length ? (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.map((customer, index) => (
                <Customer key={index} content={customer} />
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p>Soriskaaaaa</p>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.storeCustomers.customers
});

const mapDispatchToProps = { getCustomers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers);
