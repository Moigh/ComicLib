from flask import Flask
from .models import db 
from . import routes

app = Flask(__name__)

# КОНФИГУРАЦИЯ БАЗЫ ДАННЫХ
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///comicbooks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Инициализируем БД с приложением
db.init_app(app)

# Создаём таблицы в БД (если их нет)
with app.app_context():
    db.create_all()

# Регистрируем маршруты
app.add_url_rule('/api/comics', 'get_comics', routes.get_comics, methods=['GET'])
app.add_url_rule('/api/comics/<int:comic_id>', 'get_comic', routes.get_comic, methods=['GET'])
app.add_url_rule('/api/comics/<int:comic_id>/chapters', 'get_comic_chapters', 
                 routes.get_comic_chapters, methods=['GET'])
app.add_url_rule('/api/populate', 'populate_db', routes.populate_db, methods=['POST'])

# Тестовые маршруты
@app.route('/')
def hello():
    return 'Backend is working!'

@app.route('/api/test')
def test():
    return 'Test is working!'