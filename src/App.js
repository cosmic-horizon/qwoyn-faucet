import React, { useState } from 'react';
import './App.css';
import Logo from './Logo';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const App = () => {
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const is_valid_qwoyn_address = (address) => {
    if (!address.startsWith('qwoyn')) {
      return false;
    }

    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let i = 4; i < 43; i++) {
      if (!alphabet.includes(address.charAt(i)) {
        return false;
      }
    }
    return true;
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    if (!is_valid_qwoyn_address(address)) {
      setErrorMessage('Invalid Qwoyn address');
      handleShow(); // Show the modal for error message
      return;
    }

    try {
      const response = await fetch(`http://45.77.214.92:5000?address=${address}`);
      const responseData = await response.json();

      if (response.status === 200) {
        console.log('Response Data:', responseData);

        // Access the "tx_response" field within the "response" object
        if (responseData.response) {
          const txHash = responseData.response.tx_response.txhash;
          setSuccessMessage(`Transaction successful. Tx Hash: ${txHash}`);
          handleShow(); // Show the modal for success message
        } else {
          console.log('Transaction failed');
          setErrorMessage('Transaction failed');
          handleShow(); // Show the modal for error message
        }
      } else {
        console.error('Request Error:', responseData);
        setErrorMessage('Failed to request tokens');
        handleShow(); // Show the modal for error message
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setErrorMessage('Tokens Sent');
      handleShow(); // Show the modal for error message
    }
  };

  return (
      <div className="app">
        <Logo /> {/* Display the Logo component */}
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address-input">Enter Qwoyn Address:</label>
              <input
                  type="text"
                  className="form-control"
                  id="address-input"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button type="submit" id="submit-button" className="btn btn-primary">
              Request Tokens
            </button>
          </form>
        </div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{successMessage ? 'Success' : 'Error'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage ? successMessage : errorMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default App;
