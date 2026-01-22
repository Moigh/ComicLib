import ComicCard from '../components/ComicCard';

function HomePage() {
  // Тестовые данные
  const testComics = [
    { id: 1, name: 'One Piece плол вл длов ыдловыа длыв адлыва', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 1997, chapters_count: 123 },
    { id: 2, name: 'Наруто', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 1999, chapters_count: 123 },
    { id: 3, name: 'Блич', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2001, chapters_count: 123 },
    { id: 4, name: 'Атака Титанов', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2009, chapters_count: 123 },
    { id: 5, name: 'Магическая битва', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2018, chapters_count: 123 },
    { id: 6, name: 'Ванпанчмен', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2012, chapters_count: 123 },
    { id: 7, name: 'Моб Психо 100', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2012, chapters_count: 123 },
    { id: 8, name: 'Токийские мстители', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2017, chapters_count: 123 },
    { id: 9, name: 'Человек-бензопила', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2018, chapters_count: 123 },
    { id: 10, name: 'Доктор Стоун', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 2017, chapters_count: 123 },
    { id: 11, name: 'Хантер х Хантер', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 1998, chapters_count: 123 },
    { id: 12, name: 'Ван Пис', cover_image: 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg', year: 1997, chapters_count: 123 }
  ];

  return (
    <div className="container mt-3">
      <h3 className="mb-3">Комиксы</h3>      
      <div className="row g-4">
        {testComics.map(comic => (
          <ComicCard key={comic.id} comic={comic} />          
        ))}
      </div>
    </div>
  );
}

export default HomePage;