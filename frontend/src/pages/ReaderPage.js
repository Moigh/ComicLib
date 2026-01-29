import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import ChapSelect from '../components/ChapSelect';
import ReaderNavbar from '../components/ReaderNavbar';

function ReaderPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  
  const [currentChapter, setCurrentChapter] = useState(null);
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const checkNotFound=(Res)=>{
    if (Res.status === 404) {
      navigate('/404', { replace: true });
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('popstate', handleBackButton);
    window.history.pushState(null, '', window.location.pathname);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);
   
  const handleBackButton = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/chapters/${chapterId}`);
    const chapter = await res.json();

    if (window.confirm('Выйти из читалки? Прогресс не сохранится.')) {
      navigate(`/comic/${chapter.comicbook_id}`);
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, [chapterId]);
  
  const fetchChapterData = async () => {    
    const previousChapterNumber = currentChapter?.chapter_number || 0;

    const chapterRes = await fetch(`/api/chapters/${chapterId}`);
    checkNotFound(chapterRes);
    const chapterData = await chapterRes.json();
    setCurrentChapter(chapterData);
    
    const comicRes = await fetch(`/api/comics/${chapterData.comicbook_id}`);
    const comicData = await comicRes.json();
    setComic(comicData);
    
    const chaptersRes = await fetch(`/api/comics/${chapterData.comicbook_id}/chapters`);
    const chaptersData = await chaptersRes.json();
    setChapters(chaptersData);
    
    const pagesRes = await fetch(`/api/chapters/${chapterId}/pages`);
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
      <ReaderNavbar 
        onOpenChapSelect={() => setIsDropdownOpen(true)}
        onNavigate={() => navigate(`/comic/${comic.id}`)}
        comicName={comic.name}
        currentChapterNumber={currentChapter.chapter_number}
        currentChapterName={currentChapter.name}
        currentPageIndex = {currentPageIndex}
        currentPage = {currentPage}
        currentChapterPagesLength = {currentChapter.pages?.length || 0}
      />
      
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
        ) 
        : (null)
        }
      </div>
      
      {isDropdownOpen && (<ChapSelect
        onClose={() => setIsDropdownOpen(false)}
        chapters={chapters}
        currentChapterId={currentChapter?.id}
        onSelectChapter={handleChapterSelect}/>
      )}
    </div>
  );
}

export default ReaderPage;