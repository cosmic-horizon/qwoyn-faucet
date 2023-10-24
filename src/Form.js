import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
    const [address, setAddress] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false);

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

        if (!is_valid_qwoyn_address(address)) {
            alert('Invalid Qwoyn address');
            return;
        }

        if (isRequestSent) {
            alert('Request already sent.');
            return;
        }

        setIsButtonDisabled(true); // Disable the button
        setIsRequestSent(true);

        // Simulate an API call (you should replace this with your actual API call)
        setTimeout(() => {
            // Replace this with your API call logic

            // For the purpose of this example, we simulate a success scenario
            const success = true;

            if (success) {
                alert('Tokens sent!');
            } else {
                alert('Token send failed.');
            }
        }, 2000); // Simulated delay

        // Submit the data
        onSubmit({ address });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div>
                    <label htmlFor="address-input" className="form-label">
                        Enter Qwoyn Address:
                    </label>
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
                className="btn btn-primary"
                disabled={isButtonDisabled || !address}
            >
                {isRequestSent ? 'Tokens Requested' : 'Request Tokens'}
            </button>
        </form>
    );
};

export default Form;
