import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Generalgames from "./pages/Generalgames";
import Egames from "./pages/Egames";
import Geekgames from "./pages/Geekgames";
import Smec from "./pages/Smec";
import ScrollToTop from "../Scrolltotop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/smec" element={<Smec />} />
        <Route path="/generalgames" element={<Generalgames />} />
        <Route path="/egames" element={<Egames />} />
        <Route path="/geekgames" element={<Geekgames />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
