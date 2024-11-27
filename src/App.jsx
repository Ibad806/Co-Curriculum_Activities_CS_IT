import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
