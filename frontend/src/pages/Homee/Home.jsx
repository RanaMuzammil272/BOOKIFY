import React from 'react'
import Banner from '../../components/Banner'
import MostReadBooks from './MostReadBooks'
import FavouriteBooks from './FavouriteBooks'
import PromoBanner from './PromoBanner'
import OtherBooks from './OtherBooks'
import Review from './Review'

const Home = () => {
  return (
   <div>
    <Banner/>
    
    <FavouriteBooks/>
    <MostReadBooks/>
    <PromoBanner/>
    <Review />

   </div>
  )
}



export default Home