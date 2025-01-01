import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Generalgames from "./pages/Generalgames";
import Egames from "./pages/Egames";
import Geekgames from "./pages/Geekgames";
import Smec from "./pages/Smec";
import ScrollToTop from "./components/ScrollToTop";
import Gamepage from "./pages/Gamepage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/smec">
          <Route index element={<Smec />} />
          <Route path="generalgames" element={<Generalgames />} />
          <Route path="generalgames:id" element={<Gamepage />} />
          <Route path="egames" element={<Egames />} />
          <Route path="geekgames" element={<Geekgames />} />
        </Route>
        {/* <Route path="gamepage" element={<Gamepage />} /> */}
      </Routes>
    </>
  );
}

export default App;
