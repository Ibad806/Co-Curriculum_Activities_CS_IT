import React from "react";
import Navbar from "../components/navbar/Navbar";
import Events from "../components/events/Events";
import EventSlider from "../components/EventSlider";

const Home = () => {
  return (
    <>
      <Navbar />

      <Events/>

      <EventSlider/>

    </>
  );
};

export default Home;
