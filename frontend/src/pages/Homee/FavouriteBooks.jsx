import React from 'react'
import FavBookImg from "../../assets/favoritebook.jpg"
import { Link } from 'react-router-dom'
const FavouriteBooks = () => {

  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2'>
            <img src={FavBookImg} alt="" className='rounded md:w-10/12' />
        </div>

        <div className='md:w-1/2 space-y-6'>
            <h2 className='text-4xl font-bold my-5 md:w-3/4 leading-snug'>Find Your Favourite 
            <span className='text-blue-700'> Book Here!</span></h2>
            <p className=' mb-10 text-lg md:w-5/6 text-justify'>Welcome to our website where you can embark on a journey through the endless realms of literature to discover your next favorite book. Whether you're drawn to the captivating allure of mystery, the heartwarming embrace of romance, the adrenaline-fueled excitement of thrillers, or the profound insights of non-fiction, we have something for every avid reader.</p>

                       {/*stats*/}

            <div className='flex flex-colsm:flex-row justify-between gap-6 md:w-3/4 my-14'>
                <div>
                    <h3 className='text-3xl font-bold'>800+</h3>
                    <p className='text-base'>Book Listing</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bold'>550+</h3>
                    <p className='text-base'>Registered Users</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bold'>1200+</h3>
                    <p className='text-base'>PDF Downloads</p>
                </div>
            </div>
            <Link to="/allBooks" className='mt-12 block'><button className='bg-blue-700 text-white  font-semibold px-5 py-2 rounded hover:bg-black trasit duration-300 '>Explore More</button></Link>

        </div>
    </div>
  )
}

export default FavouriteBooks