import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { createCustomer } from '../../../store/actions/customersActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: null
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    let newUser = {
      customerName: this.state.customerName,
      customerEmail: this.state.customerEmail,
      customerPhone: this.state.customerPhone,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    await this.props.createCustomer(newUser);
    if (_.isEmpty(this.state.errors)) {
      if (window.confirm('Check your email!')) {
        this.props.history.push('/login');
      }
    }
  };

  render() {
    const errors = this.state.errors;
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              type="text"
              placeholder=""
              name="customerName"
              value={this.state.customerName}
              onChange={this.onChange}
            />
          </Form.Field>
          {errors && <p style={{ color: 'red' }}>{errors.customerPhone}</p>}
          <Form.Field>
            <label>Email</label>
            <input
              type="text"
              placeholder=""
              name="customerEmail"
              value={this.state.customerEmail}
              onChange={this.onChange}
            />
          </Form.Field>
          {errors && <p style={{ color: 'red' }}>{errors.customerEmail}</p>}
          <Form.Field>
            <label>Phone Number</label>
            <input
              type="text"
              placeholder=""
              name="customerPhone"
              value={this.state.customerPhone}
              onChange={this.onChange}
            />
          </Form.Field>
          {errors && <p style={{ color: 'red' }}>{errors.customerPhone}</p>}
          <Form.Field>
            <label>Username</label>
            <input
              type="text"
              placeholder=""
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
          </Form.Field>
          {errors && <p style={{ color: 'red' }}>{errors.username}</p>}
          {errors && <p style={{ color: 'red' }}>{errors.message}</p>}
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </Form.Field>
          {errors && <p style={{ color: 'red' }}>{errors.password}</p>}
          <Form.Field>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
          </Form.Field>
          {errors && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  isAuthenticated: state.security.isAuthenticated
});
const mapDispatchToProps = { createCustomer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
