import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/accounts'); 
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div className="mt-20 container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Payment Information</h1>
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-gray-700 font-bold uppercase border-b border-gray-300">
              Card Number
            </th>
            <th className="py-3 px-6 bg-gray-100 text-gray-700 font-bold uppercase border-b border-gray-300">
              Username
            </th>
            <th className="py-3 px-6 bg-gray-100 text-gray-700 font-bold uppercase border-b border-gray-300">
              Price
            </th>
            <th className="py-3 px-6 bg-gray-100 text-gray-700 font-bold uppercase border-b border-gray-300">
              Expiry
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="bg-white">
              <td className="py-4 px-6 border-b border-gray-300">{payment.cardNo}</td>
              <td className="py-4 px-6 border-b border-gray-300">{payment.username}</td>
              <td className="py-4 px-6 border-b border-gray-300">{payment.enteredPrice}</td>
              <td className="py-4 px-6 border-b border-gray-300">{payment.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default DisplayPayments;