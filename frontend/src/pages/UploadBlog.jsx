import React, { useState } from 'react';
import axios from 'axios';
const UploadBlog = () => {
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const  handleSubmit = async (e) => {
    e.preventDefault();
    
    const formdata=new FormData();
    formdata.append('Title',title);
    formdata.append('authorName',authorName);
    formdata.append('description',description);
    try {
      const result = await axios.post("http://localhost:5000/api/blogs/", formdata, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Upload successful:", result.data);
      
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error status:", error.response.status);
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        
        console.error("No response received from server:", error.request);
      } else {
        
        console.error("Error setting up the request:", error.message);
      }
      
    }
    


   
    
    setTitle('');
    setAuthorName('');
    setDescription('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-gray-300 to-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="authorName" className="block font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBlog;
