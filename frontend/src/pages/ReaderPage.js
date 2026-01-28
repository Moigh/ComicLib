import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import ChapSelect from '../components/ChapSelect';

function ReaderPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  
  const [currentChapter, setCurrentChapter] = useState(null);
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    fetchChapterData();
  }, [chapterId]);
  
  const fetchChapterData = async () => {    
    const previousChapterNumber = currentChapter?.chapter_number || 0;

    const chapterRes = await fetch(`http://localhost:5000/api/chapters/${chapterId}`);
    const chapterData = await chapterRes.json();
    setCurrentChapter(chapterData);
    
    const comicRes = await fetch(`http://localhost:5000/api/comics/${chapterData.comicbook_id}`);
    const comicData = await comicRes.json();
    setComic(comicData);
    
    const chaptersRes = await fetch(`http://localhost:5000/api/comics/${chapterData.comicbook_id}/chapters`);
    const chaptersData = await chaptersRes.json();
    setChapters(chaptersData);
    
    const pagesRes = await fetch(`http://localhost:5000/api/chapters/${chapterId}/pages`);
    const pagesData = await pagesRes.json();
    setCurrentChapter(prev => ({ ...prev, pages: pagesData }));

    if (chapterData.chapter_number < previousChapterNumber && !isDropdownOpen){
      setCurrentPageIndex(pagesData.length - 1);
    }else{      
      setCurrentPageIndex(0);
      setIsDropdownOpen(false);
    }
  };
  
  const goToNextPage = () => {    
    if (!currentChapter?.pages) return;
  
    if (currentPageIndex < currentChapter.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      const sorted = [...chapters].sort((a, b) => a.chapter_number - b.chapter_number);
      const currentIndex = sorted.findIndex(ch => ch.id === currentChapter.id);
      
      if (currentIndex < sorted.length - 1) {
        navigate(`/reader/${sorted[currentIndex + 1].id}`);
      }
    }
  };
  
  const goToPrevPage = async () => {
    if (!currentChapter?.pages) return;
    
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      const sorted = [...chapters].sort((a, b) => a.chapter_number - b.chapter_number);
      const currentIndex = sorted.findIndex(ch => ch.id === currentChapter.id);

      if (currentIndex > 0) {        
        navigate(`/reader/${sorted[currentIndex - 1].id}`);     
      }
    }
  };
  
  const handleChapterSelect = (chapter) => {
    navigate(`/reader/${chapter.id}`);
  };
  
  if (!currentChapter || !comic) return null;
  
  const currentPage = currentChapter.pages?.[currentPageIndex];
  
  return (
    <div onClick={(e) => {
      if (!e.target.closest('nav') && !isDropdownOpen) {
        const clickX = e.clientX;
        if (clickX > window.innerWidth / 2) {
          goToNextPage();
        } else {
          goToPrevPage();
        }
      }
    }}>
      {/* Навбар */}
      <nav 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgb(8, 11, 24)',
          color: 'white',
          padding: '0.5rem 1rem',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ flex: 1 }}>
          <button 
            onClick={() => navigate(`/comic/${comic.id}`)}
            className="btn btn-link text-white text-decoration-none text-truncate d-none d-md-block"
            style={{ maxWidth: '200px' }}
          >
            {comic.name}
          </button>
          
          <button 
            onClick={() => navigate(`/comic/${comic.id}`)}
            className="btn btn-outline-light btn-sm d-md-none"
          >
            ←
          </button>
        </div>
        
        <div className="position-relative flex-grow-1" style={{ minWidth: 0 }}>
          <button 
            onClick={(e) => {
              setIsDropdownOpen(true);
            }}
            className="btn btn-outline-light text-truncate w-100 p-2"
          >
            Глава {currentChapter.chapter_number}
            {currentChapter.name && `: ${currentChapter.name}`}
          </button>
        </div>
        
        <div className="text-white-50 text-nowrap fs-6" style={{ flex: 1, textAlign: 'right' }}>
          {currentPage ? `${currentPageIndex + 1} / ${currentChapter.pages?.length || 0}` : 'Загрузка...'}
        </div>
      </nav>
      
      <div 
        className="d-flex align-items-center justify-content-center bg-dark"
        style={{
          height: '100vh',
          paddingTop: '60px'
        }}
      >
        {currentPage ? (
          <img 
            src={currentPage.page_image}
            alt={`Страница ${currentPage.page_number}`}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <div className="text-white">Загрузка страницы...</div>
        )}
      </div>
      
      {isDropdownOpen && (<ChapSelect
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        chapters={chapters}
        currentChapterId={currentChapter?.id}
        onSelectChapter={handleChapterSelect}/>
      )}
    </div>
  );
}

export default ReaderPage;