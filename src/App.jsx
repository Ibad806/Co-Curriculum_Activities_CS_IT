import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Events from './pages/Events';
// import Gallery from './pages/Gallery';
import Generalgames from './pages/Generalgames';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        <Route path="/generalgames" element={<Generalgames />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
