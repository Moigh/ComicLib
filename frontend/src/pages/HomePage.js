import ComicCard from '../components/ComicCard';
import React, { useState, useEffect } from 'react';

function HomePage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Запрос к API
    fetch('/api/comics')
      .then(response => response.json())
      .then(data => {
        setComics(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-3">
      <h3 className="mb-3">Комиксы</h3>      
      <div className="row g-4">
        {comics.map(comic => (
          <ComicCard key={comic.id} comic={comic} />          
        ))}
      </div>
    </div>
  );
}

export default HomePage;