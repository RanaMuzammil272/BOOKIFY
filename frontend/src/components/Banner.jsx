import React from 'react'
import BannerCard from '../pages/Homee/BannerCard'

function Banner() {
  return (
    <div className='px-4 lg:px-24 bg-gradient-to-r from-blue-gray-300 to-gray-300 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/*left side*/}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h1 className="text-5xl text-center  font-bold leading-snug text-black ">
            Unlock Your Imagination
            <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
              {" "}
              One Page 
            </span>
            {" "} at a Time.
            <p className="mt-10 text-lg text-center text-neutral-700 max-w-4xl">
              Where stories come to life and adventures await on every page. Explore a world of diverse genres, from thrilling mysteries to heartwarming
              romances, and embark on journeys that will captivate your mind and stir your emotions.
            </p>
            <br />
            <div className="flex items-center justify-center gap-4"> {/* Updated */}
              <input 
                type="search" 
                name="search" 
                id="search" 
                placeholder='Search a book' 
                className='py-2 px-2 rounded-md text-base' 
              />
              <button 
                className='bg-blue-700 px-2 py-2 text-white text-sm font-medium rounded-md hover:bg-black transition-all ease-in duration-200'
              >
                Search
              </button>
            </div>
          </h1>
        </div>
        {/*right side*/}
        <div>
          <BannerCard/>
        </div>
      </div>
    </div>
  )
}

export default Banner
