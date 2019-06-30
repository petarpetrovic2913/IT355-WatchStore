import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminSecuredRoute = ({
  component: Component,
  security,
  ...otherProps
}) => {
  return (
    <Route
      {...otherProps}
      render={props => {
        return security.role === 'ROLE_ADMIN' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(AdminSecuredRoute);
