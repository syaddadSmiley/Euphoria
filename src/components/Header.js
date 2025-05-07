import React, { useState, useEffect } from 'react'; // Import hooks
import { Container, Navbar, Nav } from 'react-bootstrap'; // Dropdown is commented out, removed from import for now
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  // State to track if the page is scrolled to the top
  const [isTop, setIsTop] = useState(true);

  // Effect to handle scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Set isTop to true if scrollY is 0, false otherwise
      setIsTop(window.scrollY === 0);
    };

    // Run handler once on mount to set initial state correctly
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <Navbar
      // Remove bg="dark" - we'll control background via CSS class now
      variant="dark"
      expand="lg"
      fixed="top" // Make the navbar fixed at the top
      // Conditionally apply 'navbar-transparent' class
      className={`header ${isTop ? 'navbar-transparent' : ''}`}
    >
      <Container fluid>
        {/* Logo on the left */}
        <Navbar.Brand href="/" className="header-left">
          <img
            src="/logo2k.png" // Make sure this path is correct relative to your public folder
            alt="Company Logo"
            className="logo-img"
          />
        </Navbar.Brand>

        {/* Mobile menu toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation content */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="header-nav">
            {/* Ensure Nav.Link content remains visible */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ticket">Ticket</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>

          {/* User dropdown (commented out as in original) */}
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