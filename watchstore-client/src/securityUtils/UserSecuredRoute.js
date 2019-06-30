import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserSecuredRoute = ({
  component: Component,
  security,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={props =>
      security.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(UserSecuredRoute);
