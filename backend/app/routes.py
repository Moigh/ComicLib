from flask import jsonify
from .models import db, ComicBook, Author, Chapter, Page
from datetime import date

# Получить ВСЕ комиксы
def get_comics():
    comics = ComicBook.query.all()
    return jsonify([comic.to_dict() for comic in comics])

# Получить ОДИН комикс по ID
def get_comic(comic_id):
    comic = ComicBook.query.get(comic_id)
    if comic:
        return jsonify(comic.to_dict())
    return jsonify({'error': 'comic not found'}), 404

# Получить главы комикса
def get_comic_chapters(comic_id):
    chapters = Chapter.query.filter_by(ComicBook_id=comic_id).all()
    return jsonify([chapter.to_dict() for chapter in chapters])

# Заполнить БД тестовыми данными
def populate_db():
    db.drop_all()
    db.create_all()
    
    author1 = Author(name="Эйитиро Ода")
    author2 = Author(name="Масаси Кишимото")
    db.session.add_all([author1, author2])
    
    comic1 = ComicBook(
        name="Ван Пис",
        description="Пираты ищут сокровище",
        cover_image="https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg",
        year=1997
    )    
    comic2 = ComicBook(
        name="Наруто",
        description="Ниндзя и его друзья",
        cover_image="https://cover.imglib.info/uploads/cover/naruto/cover/f2dc9dc8-d1e8-406b-86a2-e6af64c7cd0f.jpg",
        year=1999
    )
    
    comic1.authors.append(author1)
    comic2.authors.append(author2)

    db.session.add_all([comic1, comic2])
    db.session.commit()

    chapter0 = Chapter(
        chapter_number = 0
    )

    chapter0.comicbook = comic2

    chapter1 = Chapter(
        chapter_number = 1,
        name = "Удзумаки Наруто!"
    )

    chapter1.comicbook = comic2
    
    chapter2 = Chapter(
        chapter_number = 2,
        name = "Конохамару!!"
    )

    chapter2.comicbook = comic2

    db.session.add_all([chapter0, chapter1, chapter2])
    db.session.commit()

    page1 = Page(
        page_number = 1,
        page_image = "https://img3.mixlib.me//manga/naruto/chapters/1-0/01.jpg"
    )
    
    page1.chapter = chapter0

    db.session.add(page1)
    db.session.commit()
    
    return jsonify({'message': 'Test data created!', 'count': ComicBook.query.count()}), 201