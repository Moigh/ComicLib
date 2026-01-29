import os
from pathlib import Path
from flask import Flask
from .models import db 
from . import routes
from flask_cors import CORS
from flask import send_from_directory


# Получаем путь к build 
frontend_build =(Path(__file__).parent.parent.parent / 'frontend' / 'build').resolve()

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])


# КОНФИГУРАЦИЯ БАЗЫ ДАННЫХ
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///comicbooks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Инициализируем БД с приложением
db.init_app(app)

# Создаём таблицы в БД (если их нет)
with app.app_context():
    db.create_all()

# API
@app.route('/api/comics', methods=['GET'])
def get_comics():
    return routes.get_comics()

@app.route('/api/comics/<int:comic_id>', methods=['GET'])
def get_comic(comic_id):
    return routes.get_comic(comic_id)

@app.route('/api/comics/<int:comic_id>/chapters', methods=['GET'])
def get_comic_chapters(comic_id):
    return routes.get_comic_chapters(comic_id)

@app.route('/api/chapters/<int:chapter_id>', methods=['GET'])
def get_chapter(chapter_id):
    return routes.get_chapter(chapter_id)

@app.route('/api/chapters/<int:chapter_id>/pages', methods=['GET'])
def get_chapter_pages(chapter_id):
    return routes.get_chapter_pages(chapter_id)

@app.route('/api/pages/<int:page_id>', methods=['GET'])
def get_page(page_id):
    return routes.get_page(page_id)

# Production
@app.route('/static/<path:filename>')
def find_static(filename):
    return send_from_directory(os.path.join(app.frontend_build, 'static'), filename)

@app.route('/<path:path>')
def serve_react(path):
    return send_from_directory(app.frontend_build, 'index.html')