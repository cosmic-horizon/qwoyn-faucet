import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const is_valid_qwoyn_address = (address) => {
    if (address.length !== 43 || !address.startsWith('qwoyn')) {
      return false;
    }

    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let i = 4; i < 43; i++) {
      if (!alphabet.includes(address.charAt(i))) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    if (!is_valid_qwoyn_address(address)) {
      setErrorMessage('Invalid Qwoyn address');
      return;
    }

    try {
      // Send a request to the specified URL and fetch the address data
      const response = await fetch(`http://45.77.214.92:5000/?address=${address}`);
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      setErrorMessage('Failed to request tokens');
    }
  };

  return (
      <div className="container mt-5">
        <div className={`alert alert-success ${successMessage ? '' : 'd-none'}`}>{successMessage}</div>
        <div className={`alert alert-danger ${errorMessage ? '' : 'd-none'}`}>{errorMessage}</div>
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
          <button type="submit" className="btn btn-primary">
            Request Tokens
          </button>
        </form>
      </div>
  );
};

export default App;
