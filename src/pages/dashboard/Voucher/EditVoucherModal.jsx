import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditVoucherModal = ({ show, handleClose, voucher, handleEdit }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (voucher) {
      setDescription(voucher.description);
      setStatus(voucher.status);
    }
  }, [voucher]);

  const handleSubmit = async () => {
    const updatedVoucher = {
      description,
      status,
    };

    try {
      const response = await axios.put(`/api/vouchers/${voucher.voucher_id}`, updatedVoucher);
      handleEdit(voucher.voucher_id, response.data);
    } catch (error) {
      console.error('Error editing voucher:', error);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Voucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="voucherDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit voucher description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVoucherModal;
