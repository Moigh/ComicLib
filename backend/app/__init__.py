from flask import Flask
from . import routes

app = Flask(__name__)

app.add_url_rule('/api/titles', 'get_titles', routes.get_titles, methods=['GET'])
app.add_url_rule('/api/titles/<int:title_id>', 'get_title', routes.get_title, methods=['GET'])
app.add_url_rule('/api/titles/<int:title_id>/chapters', 'get_title_chapters', 
                 routes.get_title_chapters, methods=['GET'])

@app.route('/')
def hello():
    return 'Backend is working!'

@app.route('/api/test')
def test():
    return 'Test is working!'