import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { login } from '../../../store/actions/authActions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: null,
      rememberMe: false
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors
    });
    if (nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    let newUser = {
      username: this.state.username,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    };
    this.props.login(newUser);
  };

  onClick = e => {
    this.setState({
      rememberMe: e.target.checked
    });
  };

  render() {
    const errors = this.state.errors;
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
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
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              placeholder=""
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </Form.Field>
          <p style={{ color: 'red' }}>{errors && errors.message}</p>
          <Form.Field className="checkboxWrapper">
            <input type="checkbox" onClick={this.onClick} name="Remember me" />
            <span className="loginLabel">Remember me</span>
          </Form.Field>
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
const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
