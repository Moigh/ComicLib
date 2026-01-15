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
app.add_url_rule('/api/titles', 'get_titles', routes.get_titles, methods=['GET'])
app.add_url_rule('/api/titles/<int:title_id>', 'get_title', routes.get_title, methods=['GET'])
app.add_url_rule('/api/titles/<int:title_id>/chapters', 'get_title_chapters', 
                 routes.get_title_chapters, methods=['GET'])

# Тестовые маршруты
@app.route('/')
def hello():
    return 'Backend is working!'

@app.route('/api/test')
def test():
    return 'Test is working!'