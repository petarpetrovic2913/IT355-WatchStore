import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from './Logo/Logo';
import './Header.css';
import { logout } from '../../store/actions/authActions';

class Header extends Component {
  logoutAction = () => {
    this.props.logout();
    window.location.href('/');
  };

  renderUserHeader = () => (
    <div className="links">
      <Link to="/cart" style={{ paddingRight: '30px' }}>
        Cart
      </Link>
      <Link to="/" onClick={this.logoutAction}>
        Logout
      </Link>
    </div>
  );

  renderAdminHeader = () => (
    <div className="links">
      <Link to="/customers">List of registered customers</Link>
      <Link to="/add">Add product</Link>
      <Link to="/" onClick={this.logoutAction}>
        Logout
      </Link>
    </div>
  );

  renderIncognitoHeader = () => (
    <div className="links">
      <Link to="/register">Sign up</Link>
      <Link to="/login">Login</Link>
    </div>
  );

  render() {
    const { isAuthenticated, role } = this.props.security;
    const userHeader = isAuthenticated && role === 'ROLE_USER';
    const adminHeader = isAuthenticated && role === 'ROLE_ADMIN';
    const incognitoHeader = !isAuthenticated;

    return (
      <div className="headerHolder">
        <Logo />
        {userHeader && (
          <p className="welcome">{`Welcome ${
            this.props.security.customerName
          }`}</p>
        )}
        {userHeader && this.renderUserHeader()}
        {adminHeader && this.renderAdminHeader()}
        {incognitoHeader && this.renderIncognitoHeader()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
