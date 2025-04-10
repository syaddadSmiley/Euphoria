import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import AddVoucherModal from './AddVoucherModal';
import EditVoucherModal from './EditVoucherModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import '../../../styles/voucherManagement.css';
import Cookies from 'js-cookie';

const VoucherManagement = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/voucher`, {
          headers : { Authorization: `Bearer ${token}`}
        });
        setVouchers(response.data.data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };
    fetchVouchers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddVoucher = (newVoucher) => {
    setVouchers([...vouchers, newVoucher]);
  };

  const handleEditVoucher = (voucherId, updatedFields) => {
    const updatedVouchers = vouchers.map(voucher => voucher.voucher_id === voucherId ? { ...voucher, ...updatedFields } : voucher);
    setVouchers(updatedVouchers);
  };

  const handleDeleteVoucher = async () => {
    if (selectedVoucher) {
      try {
        const token = Cookies.get('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/voucher/${selectedVoucher.voucher_id}`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        setVouchers(vouchers.filter(voucher => voucher.voucher_id !== selectedVoucher.voucher_id));
        setShowDeleteModal(false);
        setSelectedVoucher(null);
      } catch (error) {
        console.error('Error deleting voucher:', error);
        alert(error);
      }
    }
  };

  return (
    <div className="voucher-management">
      <h2>Voucher Management</h2>
      <div className="actions-voucher-management">
        <div className="search-bar-wrapper">
          <InputGroup className="search-bar-voucher-management">
            <FormControl
              placeholder="Search Vouchers..."
              aria-label="Search Vouchers"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>
        <div className="add-button-wrapper">
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="add-voucher-button-voucher-management">
            Add New Voucher
          </Button>
        </div>
      </div>

      <div className="voucher-list-voucher-management">
        {vouchers
          .filter(voucher => 
            voucher.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            voucher.voucher_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            voucher.status.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(voucher => (
            <div key={voucher.voucher_id} className="voucher-item-voucher-management">
              <div className="voucher-info-card">
                <div className="voucher-info-details">
                  <div className="voucher-info-row">
                    <span className="voucher-label">ID:</span>
                    <span className="voucher-value">{voucher.voucher_id}</span>
                  </div>
                  <div className="voucher-info-row">
                    <span className="voucher-label">Description:</span>
                    <span className="voucher-value">{voucher.description}</span>
                  </div>
                  <div className="voucher-info-row">
                    <span className="voucher-label">Initial Budget:</span>
                    <span className="voucher-value">{voucher.initial_budget.toLocaleString()}</span>
                  </div>
                  <div className="voucher-info-row">
                    <span className="voucher-label">Remaining Budget:</span>
                    <span className="voucher-value">{voucher.remaining_budget.toLocaleString()}</span>
                  </div>
                  <div className="voucher-info-row">
                    <span className="voucher-label">Status:</span>
                    <span className="voucher-value">{voucher.status}</span>
                  </div>
                </div>
                <div className="voucher-info-actions">
                  <Button
                    variant="warning"
                    className="edit-button-voucher-management"
                    onClick={() => {
                      setSelectedVoucher(voucher);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete-button-voucher-management"
                    onClick={() => {
                      setSelectedVoucher(voucher);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <AddVoucherModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleAdd={handleAddVoucher} />
      <EditVoucherModal show={showEditModal} handleClose={() => setShowEditModal(false)} voucher={selectedVoucher} handleEdit={handleEditVoucher} />
      <DeleteConfirmationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleDelete={handleDeleteVoucher} />
    </div>
  );
};

export default VoucherManagement;
