import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ComicContent from '../components/ComicContent';
import ComicPoster from '../components/ComicPoster';

function ComicPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [comic, setComic] = useState(null); 
  const [chapters, setChapters] = useState([]); 
  const [navbarHeight, setNavbarHeight] = useState(0); 

  const checkNotFound=(Res)=>{
    if (Res.status === 404) {
      navigate('/404', { replace: true });
      return;
    }
  };

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
    const response = await fetch(`/api/comics/${id}`);
    checkNotFound(response);
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
    const response = await fetch(`/api/comics/${id}/chapters`);
    const data = await response.json();
    setChapters(data);
  };

  if(!comic){
    return;
  };

  return (
    <div className="container-fluid p-0" 
    style={{ 
      height: `calc(100vh - ${navbarHeight}px)`,
      display: 'flex',
      overflow: 'hidden'
    }}>
      
      <ComicPoster comic={comic} />
        
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
                    
          <ComicContent comic={comic} chapters={chapters} />
        </div>
      </div>
    </div>
  );
}

export default ComicPage;