import React from "react";
import Smec_main from "../components/Smec_main";
import Navbar from "../components/Navbar";
import Gamecard from "../components/Gamecard";
import Smeccard from "../components/Smeccard";
import Smeccategory from "../components/Smeccategory";

const Smec = () => {
  return (
    <>
      <Navbar />
      <Smec_main />
      <Smeccategory/>
    </>
  );
};

export default Smec;
