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
    <div className="container mx-auto mt-12 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Payment Information</h1>
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">Card Number</th>
            <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">Username</th>
            <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">Price</th>
            <th className="py-3 px-6 font-semibold uppercase border-b border-gray-300">Expiry</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
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
</div>

  );
};

export default DisplayPayments;