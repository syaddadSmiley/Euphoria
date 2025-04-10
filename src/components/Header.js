import React, { useState } from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container fluid>
        {/* Logo on the left */}
        <Navbar.Brand href="#home" className="header-left">
          <img
            src="logo2k.png"
            alt="Company Logo"
            className="logo-img"
          />
        </Navbar.Brand>

        {/* Mobile menu toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation content */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="header-nav">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ticket">Ticket</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>

          {/* User dropdown */}
          {/* <Dropdown className="ms-3">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <img 
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" 
                alt="User" 
                className="user-photo" 
              />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;