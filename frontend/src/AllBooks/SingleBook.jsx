import React, { useState } from 'react';
import { useNavigate,useLoaderData } from 'react-router-dom';
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const SingleBook = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const { bookTitle, imageURL, authorName, category, bookDescription, bookPDF } = useLoaderData();
  const navigate = useNavigate(); // React Router's history object

  const downloadPDF = (url) => {
    window.open(`http://localhost:5000/UploadedBooks/${url}`, "_blank","noreferrer");
  };

  const displayPDF = (url) => {
    setPdfFile(`http://localhost:5000/UploadedBooks/${url}`);
  };

  // Function to handle navigation to the payment component
  const goToPayment = () => {
    navigate('/payment'); // Redirect to the payment route
  };

  return (
    <div className='mt-20 px-4 lg:px-24'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img src={imageURL} alt={bookTitle} className='h-auto max-h-96 md:max-h-full rounded-lg shadow-lg' />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{bookTitle}</h2>
          <p className="text-lg text-gray-700 mb-4"><strong>Author:</strong> {authorName}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Genre:</strong> {category}</p>
          <p className="text-lg text-gray-700 mb-4">{bookDescription}</p>

          <div className='my-10'>
            <button
              type="button"
              onClick={()=>downloadPDF(bookPDF)}
              className='bg-blue-700 text-white font-semibold px-5 mx-2 py-2 rounded hover:bg-black transition duration-300'>Download PDF</button>
            <button
              type="button"
              onClick={()=>displayPDF(bookPDF)}
              className='bg-blue-700 text-white font-semibold px-5 mx-2 py-2 rounded hover:bg-black transition duration-300'>Read Book</button>
            <button
              type="button"
              onClick={goToPayment} // Navigate to the payment component
              className='bg-green-700 text-white font-semibold px-5 mx-2 py-2 rounded hover:bg-black transition duration-300'>Buy Book</button>
          </div>
        </div>
      </div>
      <div>
        <PdfComp pdfFile={pdfFile}/>
      </div>
    </div>
  );
};

export default SingleBook;
