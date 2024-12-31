import React from 'react'
import Navbar from '../components/Navbar'
import Gamedetails from '../components/Gamedetails'
import Footer from '../components/Footer'

const Gamepage = () => {
  return (
    <>
      <Navbar
        navcolor="bg-black"
        bordercolor="border-[#FFCD5A]"
        linkcolor="text-white"
      />
      <Gamedetails/>
      <Footer footercolor="bg-black" footertext="text-white" />
    </>
  )
}

export default Gamepage
