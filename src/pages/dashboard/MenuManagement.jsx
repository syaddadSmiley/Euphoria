import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Dropdown, DropdownButton, InputGroup, FormControl, Modal } from 'react-bootstrap';
import '../../styles/menuManagement.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Currency from '../../utils/currency';

const MenuManagement = () => {
  const [menuInfo, setMenuInfo] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentViewMode, setCurrentViewMode] = useState('card');
  const [selectedFilters, setSelectedFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control delete modal
  const [showEditModal, setShowEditModal] = useState(false); // State to control edit modal
  const [showAddModal, setShowAddModal] = useState(false); // State to control new item modal
  const [editItem, setEditItem] = useState(null); // State to hold the selected item to edit
  const [newItem, setNewItem] = useState({
    category_id: '',
    name: '',
    price: '',
    item_options: [],
    item_tags: [],
  }); // State to manage new item
  const [selectedMenuType, setSelectedMenuType] = useState(''); // Track the selected menu type
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selectedMenuType) {
      // Find the selected menu type and extract its categories
      const selectedMenu = menuInfo.find(menu => menu.id === parseInt(selectedMenuType));
      if (selectedMenu && selectedMenu.categories) {
        setCategories(selectedMenu.categories);
      }
    }
  }, [selectedMenuType, menuInfo]);

  const handleMenuTypeChange = (e) => {
    setSelectedMenuType(e.target.value);
    setNewItem({ ...newItem, category_id: '' }); // Reset selected category
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setNewItem({ ...newItem, category_id: e.target.value });
  };

  // Handle appearance toggle between card/list view
  const handleAppearanceChange = () => {
    setCurrentViewMode((prevMode) => (prevMode === 'card' ? 'list' : 'card'));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (type) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  const handleAddToDeleteList = (item) => {
    setItemsToDelete((prevItems) => {
      if (prevItems.some((i) => i.id === item.id)) {
        return prevItems.filter((i) => i.id !== item.id); // Remove item if already in the list
      } else {
        return [...prevItems, item]; // Add item to the list
      }
    });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await Promise.all(itemsToDelete.map(item =>
        axios.delete(`${process.env.REACT_APP_API_URL_MENU}/${item.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ));
      setMenuInfo(prevMenuInfo => prevMenuInfo.map(menuType => ({
        ...menuType,
        categories: menuType.categories.map(category => ({
          ...category,
          items: category.items.filter(item => !itemsToDelete.some(deletedItem => deletedItem.id === item.id))
        }))
      })));
      setItemsToDelete([]);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete items:", error);
    }
  };

  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const responseMenu = await axios.get(
        process.env.REACT_APP_API_URL_MENU,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setMenuInfo(responseMenu.data);
      console.log(responseMenu.data)
    } catch (resp) {
      setError(resp.response.data.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle opening and closing of add new item modal
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => {
    setNewItem({ name: '', price: '', item_options: [], item_tags: [] });
    setShowAddModal(false);
  };

  // Handle saving new item
  const handleSaveNewItem = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL_MENU}`, newItem, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMenuInfo((prevMenuInfo) => [...prevMenuInfo, response.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error("Failed to add item:", error.toString());
      if (error.toString().includes('AxiosError')) {
        alert(error.response.data.error);
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item); // Set the selected item for editing
    setShowEditModal(true); // Show the edit modal
  };

  const handleSaveEdit = async () => {
    try {
      const token = Cookies.get('token');
  
      // Ensure that the editItem includes the updated item_options and item_tags
      const updatedItem = {
        ...editItem,
        item_options: editItem.item_options || [],
        item_tags: editItem.item_tags || []
      };
  
      // Send the updated item to the server
      await axios.put(`${process.env.REACT_APP_API_URL_MENU}/${editItem.id}`, updatedItem, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Update the menuInfo in the local state
      setMenuInfo((prevMenuInfo) => prevMenuInfo.map((menuType) => ({
        ...menuType,
        categories: menuType.categories.map((category) => ({
          ...category,
          items: category.items.map((item) =>
            item.id === editItem.id ? { ...updatedItem } : item
          ),
        })),
      })));
  
      // Close the edit modal
      setShowEditModal(false);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const renderMenuItems = () => {
    return (
      <div>
        {menuInfo.map((menuType) => (
          <div key={menuType.id} className="menu-type-section">
            <h3>{menuType.name}</h3>
            {menuType.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="category-section">
                <h5>{category.name}</h5>
                <Row>
                  {category.items.map((item) => (
                    <Col md={4} key={item.id} className="mb-3">
                      <Card className="menu-item" onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }}>
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>{Currency(item.price)}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            variant={itemsToDelete.some(i => i.id === item.id) ? 'danger' : 'outline-danger'}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the edit modal when deleting
                              handleAddToDeleteList(item);
                            }}
                          >
                            <img src='/delete.png' alt='Delete' style={{ width: '24px', height: '24px' }} />
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderMenuItemsAsList = () => (
    <div>
      {menuInfo.map((menuType) => (
        <div key={menuType.id} className="menu-type-section mb-4">
          <h3>{menuType.name}</h3>
          {menuType.categories.map((category) => (
            <div key={category.id} className="category-section mb-3">
              <h5>{category.name}</h5>
              <ul className="list-group">
                {category.items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3"
                    onClick={() => handleEdit(item)} // Handle edit on click
                    style={{ cursor: 'pointer' }}
                  >
                    <Row className="w-100">
                      <Col xs={12} sm={4} className="d-flex align-items-center mb-2 mb-sm-0">
                        <h6 className="mb-0">{item.name}</h6>
                      </Col>
                      <Col xs={12} sm={4} className="d-flex justify-content-sm-end align-items-center">
                        <p className="mb-0">{Currency(item.price)}</p>
                      </Col>
                    </Row>
                    <div className="d-flex mt-2 mt-sm-0">
                      <Button
                        variant={itemsToDelete.some(i => i.id === item.id) ? 'danger' : 'outline-danger'}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the edit modal when deleting
                          handleAddToDeleteList(item);
                        }}
                      >
                        <img src='/delete.png' alt='Delete' style={{ width: '24px', height: '24px' }} />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderCurrentView = () => {
    if (currentViewMode === 'card') {
      return renderMenuItems();
    } else if (currentViewMode === 'list') {
      return renderMenuItemsAsList();
    }
  };

  return (
    <div id="menu-management">
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="search-bar">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search menu items..."
            aria-label="Search menu items"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            title="Filter"
            id="input-group-dropdown-2"
          >
            <Dropdown.Item as="button">
              <Form.Check
                type="checkbox"
                label="Vegetarian"
                checked={selectedFilters.vegetarian}
                onChange={() => handleFilterChange('vegetarian')}
              />
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <Form.Check
                type="checkbox"
                label="Vegan"
                checked={selectedFilters.vegan}
                onChange={() => handleFilterChange('vegan')}
              />
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <Form.Check
                type="checkbox"
                label="Gluten Free"
                checked={selectedFilters.glutenFree}
                onChange={() => handleFilterChange('glutenFree')}
              />
            </Dropdown.Item>
          </DropdownButton>
          <Button onClick={handleAppearanceChange}>
            {currentViewMode === 'card' ? 'Switch to List' : 'Switch to Card'}
          </Button>
        </InputGroup>

        <Button variant="primary" className="align-self-end" onClick={handleShowAddModal}>
          Add New Menu
        </Button>
      </div>

      {/* Show confirm delete button if there are items to delete */}
      {itemsToDelete.length > 0 && (
        <div className="confirm-delete-button mb-4">
          <Button variant="danger" onClick={handleShowModal}>
            Confirm Deletion
          </Button>
        </div>
      )}

      <div className="menu-items">
        {renderCurrentView()} {/* Render the appropriate view based on state */}
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the selected items?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing item */}
      {editItem && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Item Name */}
              <Form.Group>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editItem.name || ''}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
              </Form.Group>

              {/* Item Price */}
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editItem.price || ''}
                  onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                />
              </Form.Group>

              {/* Item Options */}
              <Form.Group>
                <Form.Label>Options</Form.Label>
                {(editItem.item_options && editItem.item_options.length > 0) ? (
                  editItem.item_options.map((option, index) => (
                    <div key={index} className="mb-2">
                      <Row>
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            value={option.name || ''}
                            onChange={(e) => {
                              const updatedOptions = [...editItem.item_options];
                              updatedOptions[index].name = e.target.value;
                              setEditItem({ ...editItem, item_options: updatedOptions });
                            }}
                            placeholder={`Option Name ${index + 1}`}
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            value={option.add_price || ''}
                            onChange={(e) => {
                              const updatedOptions = [...editItem.item_options];
                              updatedOptions[index].add_price = e.target.value;
                              setEditItem({ ...editItem, item_options: updatedOptions });
                            }}
                            placeholder="Additional Price"
                          />
                        </Col>
                        <Col md={2}>
                          <Button variant="danger" onClick={() => {
                            const updatedOptions = editItem.item_options.filter((_, i) => i !== index);
                            setEditItem({ ...editItem, item_options: updatedOptions });
                          }}>Remove</Button>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <Form.Control
                    type="text"
                    value=""
                    placeholder="No options available"
                    readOnly
                  />
                )}
                <Button variant="primary" onClick={() => {
                  setEditItem({
                    ...editItem,
                    item_options: [...editItem.item_options, { name: '', add_price: '' }]
                  });
                }}>Add Option</Button>
              </Form.Group>

              {/* Item Tags */}
              <Form.Group>
                <Form.Label>Tags</Form.Label>
                {(editItem.item_tags && editItem.item_tags.length > 0) ? (
                  editItem.item_tags.map((tag, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={tag.tag || ''}
                        onChange={(e) => {
                          const updatedTags = [...editItem.item_tags];
                          updatedTags[index].tag = e.target.value;
                          setEditItem({ ...editItem, item_tags: updatedTags });
                        }}
                        placeholder={`Tag ${index + 1}`}
                      />
                      <Button variant="danger" onClick={() => {
                        const updatedTags = editItem.item_tags.filter((_, i) => i !== index);
                        setEditItem({ ...editItem, item_tags: updatedTags });
                      }}>Remove</Button>
                    </div>
                  ))
                ) : (
                  <Form.Control
                    type="text"
                    value=""
                    placeholder="No tags available"
                    readOnly
                  />
                )}
                <Button variant="primary" onClick={() => {
                  setEditItem({
                    ...editItem,
                    item_tags: [...editItem.item_tags, { tag: '' }]
                  });
                }}>Add Tag</Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for adding new item */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            {/* Menu Type Dropdown */}
            <Form.Group>
              <Form.Label>Menu Type</Form.Label>
              <Form.Control as="select" value={selectedMenuType} onChange={handleMenuTypeChange}>
                <option value="">Select Menu Type</option>
                {menuInfo.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Category Dropdown */}
            {selectedMenuType && (
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={newItem.category_id} onChange={handleCategoryChange}>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            {/* New Item Id */}
            <Form.Group>
              <Form.Label>Item Id</Form.Label>
              <Form.Control
                type="text"
                value={newItem.id}
                onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                placeholder='e.g f001 (food with id 001), d001 (drink with id 001)'
              />
            </Form.Group>

            {/* New Item Name */}
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </Form.Group>

            {/* New Item Price */}
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
            </Form.Group>
  
              {/* New Item Options */}
              <Form.Group>
                <Form.Label>Options</Form.Label>
                {newItem.item_options && newItem.item_options.length > 0 ? (
                  newItem.item_options.map((option, index) => (
                    <div key={index} className="mb-2">
                      <Row>
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            value={option.name || ''}
                            onChange={(e) => {
                              const updatedOptions = [...newItem.item_options];
                              updatedOptions[index].name = e.target.value;
                              setNewItem({ ...newItem, item_options: updatedOptions });
                            }}
                            placeholder={`Option Name ${index + 1}`}
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            value={option.add_price || ''}
                            onChange={(e) => {
                              const updatedOptions = [...newItem.item_options];
                              updatedOptions[index].add_price = e.target.value;
                              setNewItem({ ...newItem, item_options: updatedOptions });
                            }}
                            placeholder="Additional Price"
                          />
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="danger"
                            onClick={() => {
                              const updatedOptions = newItem.item_options.filter((_, i) => i !== index);
                              setNewItem({ ...newItem, item_options: updatedOptions });
                            }}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <Form.Control
                    type="text"
                    value=""
                    placeholder="No options available"
                    readOnly
                  />
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewItem({
                      ...newItem,
                      item_options: [...newItem.item_options, { name: '', add_price: '' }]
                    });
                  }}
                >
                  Add Option
                </Button>
              </Form.Group>
  
              {/* New Item Tags */}
              <Form.Group>
                <Form.Label>Tags</Form.Label>
                {newItem.item_tags && newItem.item_tags.length > 0 ? (
                  newItem.item_tags.map((tag, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={tag.tag || ''}
                        onChange={(e) => {
                          const updatedTags = [...newItem.item_tags];
                          updatedTags[index].tag = e.target.value;
                          setNewItem({ ...newItem, item_tags: updatedTags });
                        }}
                        placeholder={`Tag ${index + 1}`}
                      />
                      <Button
                        variant="danger"
                        onClick={() => {
                          const updatedTags = newItem.item_tags.filter((_, i) => i !== index);
                          setNewItem({ ...newItem, item_tags: updatedTags });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                ) : (
                  <Form.Control
                    type="text"
                    value=""
                    placeholder="No tags available"
                    readOnly
                  />
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewItem({
                      ...newItem,
                      item_tags: [...newItem.item_tags, { tag: '' }]
                    });
                  }}
                >
                  Add Tag
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveNewItem}>
              Add Item
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  export default MenuManagement;