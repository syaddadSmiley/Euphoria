import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Make sure to create this CSS file

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div className="sidebar-header">
        <img src="your-image-url.jpg" alt="Logo" className="sidebar-logo" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/menu-management" className="sidebar-link">Menu Management</Link>
        </li>
        <li> 
          <Link to="/dashboard/register-member" className="sidebar-link">Registration Member</Link>
        </li>
        <li>
          <Link to="/dashboard/voucher-management" className="sidebar-link">Voucher Management</Link>
        </li>
        <li>
          <Link to="/dashboard/support" className="sidebar-link">Support</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
