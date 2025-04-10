import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddVoucherModal = ({ show, handleClose, handleAdd }) => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [initialBudget, setInitialBudget] = useState('');
    const [status, setStatus] = useState('active');

    const handleSubmit = async () => {
    const newVoucher = {
        voucher_id: `V00${Date.now()}`,
        description,
        initial_budget: parseInt(initialBudget),
        remaining_budget: parseInt(initialBudget),
        status,
    };

    try {
        const token = Cookies.get('token');
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/voucher/add`, newVoucher, {
            headers: {'Authorization': `Bearer ${token}`}
        });
        handleAdd(response.data.data);
    } catch (error) {
        console.error('Error adding voucher:', error);
        if(error.response.status == 401){
            navigate('/login')
        }
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="voucherDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter voucher description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="voucherBudget">
                <Form.Label>Initial Budget</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter initial budget"
                value={initialBudget}
                onChange={(e) => setInitialBudget(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="voucherStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="depleted">Depleted</option>
                </Form.Control>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
            Add Voucher
            </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default AddVoucherModal;
