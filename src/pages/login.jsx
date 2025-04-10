import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import '../styles/login.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [detail, setDetail] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = (type) => (e) => {
    setDetail((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL_AUTH+'/login',
        {
          payload:{
            email: detail.email,
            password: detail.password,
          }
        }
      );

      // Handle successful response
      console.log('Response:', response.data);
      Cookies.set('token', response.data.token, {
        expires: response.data.expire,
    });
      console.log(window.location.hostname);
      alert(1)
      navigate('/dashboard');
      // You can store the token or handle navigation after login
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? <p>LOADING</p> :
    <div id="login-container">
      <Card id="login-card">
        <Card.Body>
        {error && <p className="text-danger text-center">{error}</p>}
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={detail.email}
                onChange={handleOnChange('email')}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={detail.password}
                onChange={handleOnChange('password')}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>

            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-decoration-none forgot-password-link">
                Forgot Password?
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
