import React, { useContext, useState ,useEffect } from 'react';
import Analytics from './Homee/DashBoard/analytics';
import UploadBook from './UploadBook';
import UploadBlog from './UploadBlog';
import altafbhai from "../assets/userimg.png"
import DisplayPayments from './DisplayPayments';
import axios from 'axios';
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [isAdmin,setAdmin]=useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'));
    if (userInfo && userInfo.isAdmin) {
      setAdmin(true);
    }
    else{
      setAdmin(null)
    }
    fetchOrders();
  }, []);
  

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const handleUploadBlog = () => {
    setActiveComponent('uploadBlog');
  };

  const handleUploadBook = () => {
    setActiveComponent('uploadBook');
  };

  const handleAnalytics = () => {
    setActiveComponent('analytics');
  };

  const handleDashboard = () => {
    setActiveComponent(null);
  };
  const handleShowPayments = () => {
    setActiveComponent('payments');
  };


  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'uploadBlog':
        return <UploadBlog />;
      case 'uploadBook':
        return <UploadBook />;
      case 'analytics':
        return <Analytics />;
        case 'payments':
        return <DisplayPayments />;
      case null:
        return (
          <>
         <div className="ml-1 container mx-auto mt-20 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
  <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
    <div className="flex items-center">
      <img
        src={altafbhai}
        alt="Admin"
        className="w-16 h-16 rounded-full border-4 border-white mr-4"
      />
      <div>
        <h2 className="text-xl font-semibold text-white">Rana Muzammil</h2>
        <p className="text-sm text-gray-200">Scrum Master</p>
        <p className="text-sm text-gray-200">rana.muzammil@bookify.com</p>
      </div>
    </div>
   
  </div>
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-4">Order History</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <th className="py-3 px-4 border-b">Book Title</th>
            <th className="py-3 px-4 border-b">Order ID</th>
            <th className="py-3 px-4 border-b">Price</th>
            <th className="py-3 px-4 border-b">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
              <td className="py-3 px-4 border-b">{order.bookTitle}</td>
              <td className="py-3 px-4 border-b">{order.orderId}</td>
              <td className="py-3 px-4 border-b">{order.enteredPrice}</td>
              <td className="py-3 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

        </>
        );
      default:
        return null;
    }
  };

  return (
    isAdmin ? (
      <div className="flex h-screen ">
        <div className="bg-gray-900 w-2/12 flex flex-col rounded-lg">
          <div className="py-4 px-6 text-white text-lg mt-20 font-bold"></div>
          <ul className="flex-grow">
            <li className="py-2">
              <button onClick={handleDashboard} className="w-full flex items-center justify-start text-white px-6 py-3 hover:bg-gray-800">
                Profile
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleUploadBlog} className="w-full flex items-center justify-start text-white px-6 py-3 hover:bg-gray-800">
                Upload Blog
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleUploadBook} className="w-full flex items-center justify-start text-white px-6 py-3 hover:bg-gray-800">
                Upload Book
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleShowPayments} className="w-full flex items-center justify-start text-white px-6 py-3 hover:bg-gray-800">
                Payments
              </button>
            </li>
            <li className="py-2">
              <button onClick={handleAnalytics} className="w-full flex items-center justify-start text-white px-6 py-3 hover:bg-gray-800">
                Analytics
              </button>
            </li>
          </ul>
        </div>
        
        <div className="flex-grow bg-gray-100 overflow-auto">
          {renderActiveComponent()}
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-screen">
      <div className="bg-red-500 text-white px-6 py-4 rounded-lg">
        <p>Please Login as admin</p>
      </div>
    </div>
    )
  );
  
};

export default AdminDashboard;