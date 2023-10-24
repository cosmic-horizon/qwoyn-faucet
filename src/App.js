import React, { useState } from 'react';
import './App.css';
import Logo from './Logo';
import Header from './Header'; // Import the Header component

const App = () => {
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const is_valid_qwoyn_address = (address) => {
    if (!address.startsWith('qwoyn')) {
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

    setIsButtonDisabled(true); // Disable the button

    try {
      const response = await fetch(`http://45.77.214.92:5000?address=${address}`);
      const responseData = await response.json();

      if (response.status === 200) {
        console.log('Response Data:', responseData);

        // Access the "tx_response" field within the "response" object
        if (responseData.response) {
          const txHash = responseData.response.tx_response.txhash;
          setSuccessMessage(`Tokens Sent. Tx Hash: ${txHash}`);
        } else {
          console.log('Transaction failed');
          setErrorMessage('Transaction failed');
        }
      } else {
        console.error('Request Error:', responseData);
        setErrorMessage('Failed to request tokens');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setErrorMessage('Testnet Tokens Sent');
    }
  };

  return (
      <div className="app">
        <Header />
        <Logo /> {/* Display the Logo component */}
        <div className="container">
          <div className="description-container">
            <p>Welcome to our Qwoyn Faucet! Please enter your Qwoyn address below and 10 $QWOYN will be sent to your wallet. This will only work once! If you need more tokens please contact our dev team.</p>
          </div>
          {successMessage && (
              <div className="alert alert-success" style={{ color: 'green' }}>
                {successMessage}
              </div>
          )}
          {errorMessage && (
              <div className="alert alert-danger">
                {errorMessage}
              </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div>
                <label htmlFor="address-input" className="form-label">Enter Qwoyn Address:</label>
              </div>
              <div>
                <input
                    type="text"
                    className="form-control"
                    id="address-input"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <button
                type="submit"
                id="submit-button"
                className="btn btn-primary center-button"
                disabled={isButtonDisabled || !address}
            >
              Request Tokens
            </button>
          </form>
        </div>
      </div>
  );
};

export default App;
