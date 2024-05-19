import React, { useState } from 'react';

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNo: '',
    username: '',
    pin: '',
    expiry: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Add your payment processing logic here
      console.log('Submitted payment details:', paymentDetails);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Card number validation
    if (!paymentDetails.cardNo) {
      errors.cardNo = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentDetails.cardNo)) {
      errors.cardNo = 'Invalid card number';
    }

    // Username validation
    if (!paymentDetails.username) {
      errors.username = 'Username is required';
    }

    // PIN validation
    if (!paymentDetails.pin) {
      errors.pin = 'PIN is required';
    } else if (!/^\d{4}$/.test(paymentDetails.pin)) {
      errors.pin = 'Invalid PIN (must be 4 digits)';
    }

    // Expiry validation
    if (!paymentDetails.expiry) {
      errors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) {
      errors.expiry = 'Invalid expiry date format (MM/YY)';
    }

    return errors;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-gray-300 to-gray-300">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Enter Payment Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNo" className="block text-gray-700 font-semibold mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNo"
              name="cardNo"
              value={paymentDetails.cardNo}
              onChange={handleChange}
              className={`border rounded-md p-2 w-full ${formErrors.cardNo ? 'border-red-500' : 'border-gray-400'}`}
              placeholder="1234 5678 9012 3456"
            />
            {formErrors.cardNo && <span className="text-red-500 text-sm">{formErrors.cardNo}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={paymentDetails.username}
              onChange={handleChange}
              className={`border rounded-md p-2 w-full ${formErrors.username ? 'border-red-500' : 'border-gray-400'}`}
              placeholder="JohnDoe"
            />
            {formErrors.username && <span className="text-red-500 text-sm">{formErrors.username}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="pin" className="block text-gray-700 font-semibold mb-1">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              name="pin"
              value={paymentDetails.pin}
              onChange={handleChange}
              className={`border rounded-md p-2 w-full ${formErrors.pin ? 'border-red-500' : 'border-gray-400'}`}
              placeholder="****"
            />
            {formErrors.pin && <span className="text-red-500 text-sm">{formErrors.pin}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor="expiry" className="block text-gray-700 font-semibold mb-1">
              Expiry
            </label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={paymentDetails.expiry}
              onChange={handleChange}
              className={`border rounded-md p-2 w-full ${formErrors.expiry ? 'border-red-500' : 'border-gray-400'}`}
              placeholder="MM/YY"
            />
            {formErrors.expiry && <span className="text-red-500 text-sm">{formErrors.expiry}</span>}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-700 transition duration-300 w-full"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;