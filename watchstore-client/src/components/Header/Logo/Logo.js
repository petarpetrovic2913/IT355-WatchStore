import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './Logo.css';

const Logo = () => (
  <Link to="/">
    <img src={logo} alt="AppLogo" />
  </Link>
);

export default Logo;
