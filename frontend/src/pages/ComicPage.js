import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ComicPage() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(56); // Примерная высота

  useEffect(() => {
    fetchComic();
    // Получаем реальную высоту навбара
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, [id]);

  const fetchComic = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/comics/${id}`);
      
      if (!response.ok) {
        throw new Error('Комикс не найден');
      }
      
      const data = await response.json();
      setComic(data);
      setError(null);
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  if (!comic && !error) {
    return null;
  }

  return (
    <div className="container-fluid p-0" style={{ 
      height: `calc(100vh - ${navbarHeight}px)`, // ← ВЫЧИТАЕМ НАВБАР
      overflow: 'hidden',
      display: 'flex'
    }}>
      
      {/* ОБЕРТКА ДЛЯ ЛЕВОЙ ЧАСТИ */}
      <div style={{ 
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <div className="d-none d-md-flex align-items-center justify-content-center bg-dark"
             style={{
               width: 'auto',
               height: `calc(100vh - ${navbarHeight}px)`, // ← ТА ЖЕ ВЫСОТА
               padding: '1rem'
             }}>
          <img 
            src={comic.cover_image} 
            alt={comic.name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      
      {/* ПРАВАЯ КОЛОНКА */}
      <div className="flex-grow-1 overflow-auto">
        <div className="p-4 p-lg-5">
          {/* Картинка для мобильных */}
          <div className="d-md-none mb-4 text-center">
            <img 
              src={comic.cover_image} 
              alt={comic.name}
              className="img-fluid rounded"
              style={{ maxHeight: '70vh', width: 'auto' }}
            />
          </div>
          
          {/* Остальной контент */}
          <Link to="/" className="btn btn-outline-secondary mb-4">
            ← Назад к комиксам
          </Link>
          
          <h1 className="mb-3">{comic.name}</h1>
          
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2 mb-2">
              {comic.authors?.map((author, idx) => (
                <span key={idx} className="badge bg-primary">
                  {author.name}
                </span>
              ))}
            </div>
            <div className="text-muted">📅 {comic.year}</div>
          </div>
          
          <div className="mb-5">
            <h4>Описание</h4>
            <p className="fs-5">{comic.description}</p>
          </div>
          
          <div className="mb-5">
            <h4>Главы ({comic.chapters?.length || 0})</h4>
            
            {comic.chapters && comic.chapters.length > 0 ? (
              <div className="list-group mt-3">
                {comic.chapters.map(chapter => (
                  <Link 
                    key={chapter.id}
                    to={`/reader/${chapter.id}`}
                    className="list-group-item list-group-item-action d-flex justify-content-between"
                  >
                    <div>
                      <strong>Глава {chapter.chapter_number}</strong>
                      {chapter.name && ` - ${chapter.name}`}
                    </div>
                    <span className="text-muted">
                      {chapter.pages_count || 0} стр.
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted">Главы пока не добавлены</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicPage;