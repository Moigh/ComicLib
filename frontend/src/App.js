import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Comic from './pages/ComicPage';
import Reader from './pages/ReaderPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link> | 
        <Link to="/about">О нас</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;