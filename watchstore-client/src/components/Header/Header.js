import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Header.css';
import { logout } from '../../store/actions/authActions';
import Logo from '../Logo/Logo';

class Header extends Component {
  logoutAction = () => {
    this.props.logout();
    window.location.href('/');
  };

  renderUserHeader = () => (
    <div className="links">
      <p className="welcome">{`Welcome ${this.props.security.customerName}`}</p>
      <Link to="/cart" style={{ paddingRight: '30px' }}>
        <p className="labelLink">Cart</p>
      </Link>
      <Link to="/" onClick={this.logoutAction}>
        <p className="labelLink">Logout</p>
      </Link>
    </div>
  );

  renderAdminHeader = () => (
    <div className="links">
      <Link to="/customers">
        <p className="labelLink">Customers</p>
      </Link>
      <Link to="/add">
        <p className="labelLink">Add product</p>
      </Link>
      <Link to="/" onClick={this.logoutAction}>
        <p className="labelLink">Logout</p>
      </Link>
    </div>
  );

  renderIncognitoHeader = () => (
    <div className="links">
      <Link to="/register">
        <p className="labelLink">Sign up</p>
      </Link>
      <Link to="/login">
        <p className="labelLink">Login</p>
      </Link>
    </div>
  );

  render() {
    const { isAuthenticated, role } = this.props.security;
    const userHeader = isAuthenticated && role === 'ROLE_USER';
    const adminHeader = isAuthenticated && role === 'ROLE_ADMIN';
    const incognitoHeader = !isAuthenticated;
    const isHomePage = this.props.location.pathname === '/';

    return (
      <div className={`headerHolder ${isHomePage ? '' : 'notHomePageHeader'}`}>
        {!isHomePage && <Logo />}
        {/* {userHeader && (
          <p className="welcome">{`Welcome ${
            this.props.security.customerName
          }`}</p>
        )} */}
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
)(withRouter(Header));
