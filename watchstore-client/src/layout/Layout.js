import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import './Layout.css';

export default class Layout extends Component {
  render() {
    return (
      <div className="layoutHolder">
        <Sidebar />
        <Header />
        <div className="contentHolder">{this.props.children}</div>
      </div>
    );
  }
}
