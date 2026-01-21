import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return <h1>Домашняя</h1>;
}

function About() {
  return <h1>О проекте</h1>;
}

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