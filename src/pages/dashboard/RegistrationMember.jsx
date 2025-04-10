import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/registration-member.css'; // Add your custom CSS if needed

const RegistrationMemberPage = () => {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rfidCard: '',  // NEW: Field for RFID card input
  };

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    rfidCard: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, 'Invalid RFID Card format')
      .required('RFID Card is required'),
  });

  // Form submission logic
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Make an API call to register the user with RFID card
      const response = await axios.post('/api/register', values);

      // Handle successful registration (e.g., redirect, show message)
      setStatus({ success: 'Registration successful!' });
      resetForm(); // Clear form after submission
    } catch (error) {
      // Handle error (e.g., show error message)
      setStatus({ error: 'Registration failed. Please try again.' });
    } finally {
      setSubmitting(false); // Enable the submit button again
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && status.success && <Alert variant="success">{status.success}</Alert>}
            {status && status.error && <Alert variant="danger">{status.error}</Alert>}

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Username</BootstrapForm.Label>
              <Field
                name="username"
                type="text"
                className="form-control"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Password</BootstrapForm.Label>
              <Field
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>RFID Card</BootstrapForm.Label>
              <Field
                name="rfidCard"
                type="text"
                className="form-control"
                placeholder="Enter RFID card"
              />
              <ErrorMessage name="rfidCard" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationMemberPage;
