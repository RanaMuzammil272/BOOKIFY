import React, { useContext, useState } from 'react';
import Analytics from './Homee/DashBoard/analytics';
import UploadBook from './UploadBook';
import UploadBlog from './UploadBlog';
import { AppContext } from '../context/appContext';
import altafbhai from "../assets/bhai.png"
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const {isAdmin,setAdmin}=useContext(AppContext)

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

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'uploadBlog':
        return <UploadBlog />;
      case 'uploadBook':
        return <UploadBook />;
      case 'analytics':
        return <Analytics />;
      case null:
        return (
          <div className="relative mt-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-3xl font-bold text-white">Rana Muzammil</h2>
              <p className="text-gray-400 font-medium mt-1">Scrum Master</p>
              <p className="text-gray-400 font-medium mt-1">rana.muzammil@bookify.com</p>
            </div>
            <div className="relative">
              <img
                src={altafbhai}
                alt="Admin"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    isAdmin ? (
      <div className="flex h-screen">
        <div className="bg-gray-900 w-2/12 flex flex-col">
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