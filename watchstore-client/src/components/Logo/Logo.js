import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/slika1.png';
import './Logo.css';

const Logo = () => (
  <Link to="/" className="logoLink">
    <img src={logo} alt="AppLogo" />
  </Link>
);

export default Logo;
