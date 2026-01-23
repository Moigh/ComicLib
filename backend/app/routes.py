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
    comic = ComicBook.query.get(comic_id)
    if comic:
        return jsonify([chapter.to_dict() for chapter in comic.chapters])
    return jsonify({'error': 'comic not found'}), 404

# Получить ОДНУ главу
def get_chapter(chapter_id):
    chapter = Chapter.query.get(chapter_id)
    if chapter:
        return jsonify(chapter.to_dict())
    return jsonify({'error': 'chapter not found'}), 404

# Получить страницы главы
def get_chapter_pages(chapter_id):
    chapter = Chapter.query.get(chapter_id)
    if chapter:
        return jsonify([page.to_dict() for page in chapter.pages])
    return jsonify({'error': 'chapter not found'}), 404

# Получить ОДНУ страницу
def get_page(page_id):
    page = Page.query.get(page_id)
    if page:
        return jsonify(page.to_dict())
    return jsonify({'error': 'page not found'}), 404
