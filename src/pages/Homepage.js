import React from 'react'

// Components
import Navbar from '../components/Navbar';
import Announcement  from '../components/Annoucement';
import Slider from '../components/Slider';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Categories from '../components/Categories';


const Homepage = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Homepage;