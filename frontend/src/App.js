import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/HomePage';
import Comic from './pages/ComicPage';
import Reader from './pages/ReaderPage';
import NotFound from './pages/NotFoundPage';
import WithNavbar from './pages/WithNavbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<WithNavbar/>}>
          <Route path="/" element={<Home />} />
          <Route path="/comic/:id" element={<Comic />} />
        </ Route >
        <Route path="/reader/:chapterId" element={<Reader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;