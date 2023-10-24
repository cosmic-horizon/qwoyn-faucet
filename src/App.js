import React, { useState } from 'react';
import './App.css';
import Logo from './Logo';
import Header from './Header';
import Form from './Form'; // Import the Form component

const App = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (formData) => {
    // You can handle the form submission data here
    console.log('Form data submitted:', formData);

    // Set the success message or error message based on your actual API response
    setSuccessMessage('Tokens sent successfully'); // Replace with your success message
    // setErrorMessage('Transaction failed'); // Replace with your error message
  };

  return (
      <div className="app">
        <Header />
        <Logo />
        <div className="container">
          <div className="description-container">
            <p>
              Welcome to our Qwoyn Faucet! Please enter your Qwoyn address below, and 10 $QWOYN will be sent to your wallet.
              This will only work once! If you need more tokens, please contact our dev team.
            </p>
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
          <Form onSubmit={handleFormSubmit} />
        </div>
      </div>
  );
};

export default App;
