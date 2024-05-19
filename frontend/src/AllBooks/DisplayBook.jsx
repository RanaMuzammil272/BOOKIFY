import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DisplayBook = ({ item }) => {
  return (
    <Link to={`/book/${item._id}`}>
      <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
        <img
          className='w-full h-[350px] object-cover'
          src={item?.imageURL}
          alt={item?.bookTitle}
        />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
          <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
            {item?.bookTitle}
          </p>
          <p>
            <FaHeart className='absolute top-4 left-4 text-gray-300' />
            <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DisplayBook;
