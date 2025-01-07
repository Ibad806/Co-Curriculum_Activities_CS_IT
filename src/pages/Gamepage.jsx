import React from 'react'
import Navbar from '../components/Navbar'
import Gamedetails from '../components/Gamedetails'
import Footer from '../components/Footer'
import BlackNavbar from '../components/BlackNavbar'

const Gamepage = () => {
  return (
    <>
      <BlackNavbar/>
      <Gamedetails/>
      <Footer footercolor="bg-black" footertext="text-white" />
    </>
  )
}

export default Gamepage
