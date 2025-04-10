import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css'; // Create this CSS file

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;