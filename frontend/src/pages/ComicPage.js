import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ComicPage() {
  const { id } = useParams(); 

  const [comic, setComic] = useState(null); 
  const [chapters, setChapters] = useState([]); 
  const [navbarHeight, setNavbarHeight] = useState(0); 

  useEffect(() => { fetchComic(); }, [id]);

  useEffect(() => { 
    if (comic) { fetchChapters(); } }, [comic]); 
    
  useEffect(() => {
    measureNavbar();

    window.addEventListener('resize', measureNavbar);    
    return () => {
      window.removeEventListener('resize', measureNavbar);
    };
  }, []);

  const fetchComic = async () => {
    const response = await fetch(`http://localhost:5000/api/comics/${id}`);
    const data = await response.json();
    setComic(data);
  };

  
  const measureNavbar = () => {
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  };

  const fetchChapters = async () => {
    const response = await fetch(`http://localhost:5000/api/comics/${id}/chapters`);
    const data = await response.json();
    setChapters(data);
  };

  if (!comic) {
    return null;
  }

  return (
    <div className="container-fluid p-0" 
    style={{ 
      height: `calc(100vh - ${navbarHeight}px)`,
      display: 'flex',
      overflow: 'hidden'
    }}>
      
        <div className="d-none d-md-flex align-items-center justify-content-center bg-dark"
        style={{
          width: 'auto',
          padding: 0,
          maxWidth: '50%',
          flexShrink: 0
        }}>
          <img 
            src={comic.cover_image} 
            alt={comic.name}
              className="img-fluid rounded"
          />
        </div>
      
      <div className="flex-grow-1 overflow-auto">
        <div className="p-4 p-lg-5">
          <div className="d-md-none mb-4 text-center">
            <img 
              src={comic.cover_image} 
              alt={comic.name}
              className="img-fluid rounded"
              style={{ maxHeight: '70vh', width: 'auto' }}
            />
          </div>
          
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
            <div className="text-muted"> {comic.year}</div>
          </div>
          
          <div className="mb-5">
            <h4>Описание</h4>
            <p className="fs-5">{comic.description}</p>
          </div>
          
          <div className="mb-5">
            <h4>Главы ({chapters?.length || 0})</h4>
            
            {chapters && chapters.length > 0 ? (
              <div className="list-group mt-3">
                {chapters.map(chapter => (
                  <Link 
                    key={chapter.id}
                    to={`/reader/${chapter.id}`}
                    className="list-group-item list-group-item-action d-flex justify-content-between"
                    style={{
                      minHeight: '3rem', 
                      overflow: 'hidden'
                    }}
                  >
                    <div className="text-truncate flex-grow-1">
                      <strong>Глава {chapter.chapter_number}</strong>
                      {chapter.name && ` - ${chapter.name}`}
                    </div>
                    <span className="text-muted flex-shrink-0 ms-2">
                      {chapter.pages_count || 0} стр.
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted">Главы не добавлены</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicPage;