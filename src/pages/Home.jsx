import React from 'react'
import Herobanner from '../components/home/Herobanner'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/home/Footer'
import Bestsellers from '../components/BestSellers'

function Home() {
  return (
    <div>

      <Herobanner />
      <Bestsellers/>
      <Footer/>
    </div>
  )
}

export default Home