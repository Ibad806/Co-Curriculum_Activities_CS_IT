import React from "react";
import Allevents from "../components/Allevents";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Events = () => {
  return (
    <>
     <Navbar/>
      <Allevents event="Events" desc="You can see all events here" />
      <Footer/>
    </>
  );
};

export default Events;
