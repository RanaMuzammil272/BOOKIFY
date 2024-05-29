import React, { useState } from 'react';
import axios from 'axios';
const UploadBook = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    
    const formdata=new FormData();
    formdata.append('bookTitle',bookTitle);
    formdata.append('authorName',authorName);
    formdata.append('category',category);
    formdata.append('price',price);
    formdata.append('description',description);
    formdata.append('cover',cover);
    formdata.append('file',file);
    try {
      const result = await axios.post("http://localhost:5000/api/books/upload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload successful:", result.data);
      
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server responded with error status:", error.response.status);
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        
        console.error("No response received from server:", error.request);
      } else {
        
        console.error("Error setting up the request:", error.message);
      }
      
    }
    


   
    
    setBookTitle('');
    setAuthorName('');
    setCategory('');
    setPrice('');
    setDescription('');
    setCover('');
    setFile(null);
  };

  return (
    <div className="bg-gradient-to-r from-blue-gray-300 to-gray-300 flex justify-center items-center min-h-screen   ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 mt-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bookTitle" className="block font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              id="bookTitle"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
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
            <label htmlFor="category" className="block font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium text-gray-700">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
            <label htmlFor="cover" className="block font-medium text-gray-700">Book Cover</label>
            <input
              type="text"
              id="cover"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="file" className="block font-medium text-gray-700">Upload Book</label>
            <input
              type="file"
              id="file"
             
      
              onChange={handleFileChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
