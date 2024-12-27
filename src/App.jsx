import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Generalgames from "./pages/Generalgames";
import Egames from "./pages/Egames";
import Geekgames from "./pages/Geekgames";
import Smec from "./pages/Smec";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ScrollToTop>
            <Home />
          </ScrollToTop>
        }
      />
      <Route
        path="/events"
        element={
          <ScrollToTop>
            <Events />
          </ScrollToTop>
        }
      />
      <Route
        path="/gallery"
        element={
          <ScrollToTop>
            <Gallery />
          </ScrollToTop>
        }
      />
      <Route
        path="/smec"
        element={
          <ScrollToTop>
            <Smec />
          </ScrollToTop>
        }
      />
      <Route
        path="/generalgames"
        element={
          <ScrollToTop>
            <Generalgames />
          </ScrollToTop>
        }
      />
      <Route
        path="/egames"
        element={
          <ScrollToTop>
            <Egames />
          </ScrollToTop>
        }
      />
      <Route
        path="/geekgames"
        element={
          <ScrollToTop>
            <Geekgames />
          </ScrollToTop>
        }
      />
    </Routes>
  );
}

export default App;
