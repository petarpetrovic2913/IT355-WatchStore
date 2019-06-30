import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Table } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  deleteCustomer,
  enableCustomer,
  disableCustomer
} from '../../../../store/actions/customersActions';

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      enabled: false
    };
  }

  componentDidMount() {
    this.setState({
      enabled: this.props.content.enabled
    });
  }

  onClick = () => {
    const id = this.props.content.customerId;
    this.props.deleteCustomer(id);
  };

  onChange = e => {
    if (e.target.name === 'enabled')
      this.setState({
        enabled: true
      });
    if (e.target.name === 'disabled')
      this.setState({
        enabled: false
      });
  };

  popupEnable = () => {
    toast.info('You enabled a customer!', {
      position: toast.POSITION.TOP_LEFT
    });
  };

  popupDisable = () => {
    toast.error('You disabled a customer!', {
      position: toast.POSITION.TOP_LEFT
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { customerId } = this.props.content;
    if (this.state.enabled) {
      await this.props.enableCustomer(customerId);
      this.popupEnable();
    } else {
      await this.props.disableCustomer(customerId);
      this.popupDisable();
    }
  };

  render() {
    const { customerName, customerEmail, username, role } = this.props.content;
    return (
      <Table.Row>
        <Table.Cell width={3}>{customerName}</Table.Cell>
        <Table.Cell width={3}>{customerEmail}</Table.Cell>
        <Table.Cell width={3}>{username}</Table.Cell>
        <Table.Cell width={3}>{role}</Table.Cell>
        <Table.Cell width={3}>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <input
                type="radio"
                name="enabled"
                checked={this.state.enabled}
                onChange={this.onChange}
              />
              Enable
            </Form.Field>
            <Form.Field>
              <input
                type="radio"
                name="disabled"
                checked={!this.state.enabled}
                onChange={this.onChange}
              />
              Disable
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Button onClick={this.onClick} color="red">
            Delete
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const mapDispatchToProps = { deleteCustomer, enableCustomer, disableCustomer };

export default connect(
  null,
  mapDispatchToProps
)(Customer);
