import React from 'react'
import { Fade, Slide } from 'react-awesome-reveal'
import 'react-awesome-reveal'
import Banner from '../../components/Banner'
import MostReadBooks from './MostReadBooks'
import FavouriteBooks from './FavouriteBooks'
import PromoBanner from './PromoBanner'
import OtherBooks from './OtherBooks'
import Review from './Review'

const Home = () => {
  return (
    <div>
       <Slide direction="up" triggerOnce>
        <Banner />
      </Slide>

      <Slide direction="left" triggerOnce>
        <FavouriteBooks />
      </Slide>

      <Fade direction="up" triggerOnce duration={1000}>
        <MostReadBooks />
      </Fade>

      <Slide direction="right" triggerOnce>
        <PromoBanner />
      </Slide>

      <Fade direction="up" triggerOnce duration={2000}>
        <Review />
        </Fade>
    </div>
  )
}

export default Home