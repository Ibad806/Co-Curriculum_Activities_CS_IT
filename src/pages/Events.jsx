import React from "react";
import Allevents from "../components/Allevents";
import Navbar from "../components/Navbar";

const Events = () => {
  return (
    <>
     <Navbar/>
      <Allevents event="Events" desc="You can see all events here" />
    </>
  );
};

export default Events;
