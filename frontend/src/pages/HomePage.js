import React from 'react';

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
      {/* Заголовок */}
      <h3 className="mb-3">Комиксы</h3>
      
      {/* 
        Сетка Bootstrap:
        - На всех экранах: 4-6 карточек в строке
        - col-6: на мобильных 2 в ряд (50%)
        - col-sm-4: на планшетах 3 в ряд (33%)
        - col-md-3: на десктопах 4 в ряд (25%)
        - col-lg-2: на больших экранах 6 в ряд (16.6%)
      */}
      <div className="row g-4"> {/* g-2 маленькие отступы между карточками */}
        {testComics.map(comic => (
          <div 
            key={comic.id} 
            className="col-6 col-sm-4 col-md-3 col-lg-2"
          >
            {/* Карточка - убираем padding, делаем компактнее */}
            <div className="card h-100 border-0">
              {/* Контейнер для изображения - делаем меньше */}
              <div 
                style={{
                  position: 'relative',
                  paddingTop: '150%', // Соотношение 2:3
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={comic.cover_image}
                  alt={comic.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              {/* Текстовая часть - минимальный размер */}
              <div className="card-body p-1">
                {/* Название - маленький шрифт, ограничение по высоте */}
                <h6 
                  className="card-title " 
                  style={{
                    fontSize: '0.85rem',
                    height: '2rem',
                    overflow: 'hidden'
                  }}
                >
                  {comic.name}
                </h6>
                
                {/* Год - очень мелкий текст */}
                <div className="d-flex justify-content-between">
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    {comic.year}
                  </small>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Глав: {comic.chapters_count}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;