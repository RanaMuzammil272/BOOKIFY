import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { FaReadme } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const BookCards = ({ headline, books }) => {

  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-black my-5'>
        {headline}
      </h2>

      {/* Cards */}
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          centeredSlides={false} // Set to false to start from the beginning
          className="mySwiper w-full h-full"
        >
          {books.map(book =>
            <SwiperSlide key={book._id}>
              <Link to={`/book/${book._id}`}>
                <div className='relative'>
                  <img src={book.imageURL} alt={book.bookTitle} style={{ width: '250px', height: '300px' }} />
                  <div className='absolute top-3 right-3 bg-blue-700 hover:bg-black p-2 rounded'>
                    <FaReadme className='w-4 h-4 text-white' />
                  </div>
                </div>
                <div>
                  <div>
                    <h3>{book.bookTitle}</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default BookCards;
