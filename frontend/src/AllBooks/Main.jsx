// Main.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaReadme } from 'react-icons/fa';

const Main = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/books/all-books")
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        if (data.length > 0) {
          const randomBook = data[Math.floor(Math.random() * data.length)];
          setBook(randomBook);
        }
      });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto mt-20 px-4'>
      <div className='w-full h-[600px] text-white'>
        <div className='w-full h-full'>
          <div className='absolute w-full h-[600px] bg-gradient-to-r from-black '></div>
          <Link to={`/book/${book._id}`} className='relative'>
            <img
              className=' object-center w-screen h-full'
              src={book.imageURL}
              alt={book.bookTitle}
            />
            <div className='absolute top-3 right-3 bg-blue-700 hover:bg-black p-2 rounded'>
              <FaReadme className='w-4 h-4 text-white' />
            </div>
          </Link>
          <div className='absolute w-full top-[20%] p-4 md:p-8 '>
            <h1 className='text-3xl md:text-5xl font-bold'>{book.bookTitle}</h1>
            <div className='my-4'>
              <Link to={`/book/${book._id}`} className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                Read
              </Link>
              <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
                Read Later
              </button>
            </div>
            <p className='text-gray-400 text-sm'>
              Author Name: {book.authorName}
            </p>
            <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
              {truncateString(book.bookDescription, 150)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
