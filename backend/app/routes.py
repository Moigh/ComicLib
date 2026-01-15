from flask import jsonify

# Временные данные
MANGA_TITLES = [
    {
        'id': 1,
        'name': 'Ван Пис',
        'description': 'Пираты ищут сокровище',
        'cover_image': 'https://cover.imglib.info/uploads/cover/one-piece/cover/8f6ebbfc-5a26-4fd5-a9f0-354869b71e92.jpg'
    },
    {
        'id': 2,
        'name': 'Наруто',
        'description': 'Ниндзя и его мечта',
        'cover_image': 'https://cover.imglib.info/uploads/cover/naruto/cover/f2dc9dc8-d1e8-406b-86a2-e6af64c7cd0f.jpg'
    }
]

# Получить ВСЕ манги
def get_titles():
    return jsonify(MANGA_TITLES)

# Получить ОДНУ мангу по ID
def get_title(title_id):
    title = next((t for t in MANGA_TITLES if t['id'] == title_id), None)
    if title:
        return jsonify(title)
    return jsonify({'error': 'Title not found'}), 404

# Получить главы манги
def get_title_chapters(title_id):
    chapters = [
        {'id': 10, 'title_id': title_id, 'number': 1, 'name': 'Начало'},
        {'id': 20, 'title_id': title_id, 'number': 2, 'name': 'Развитие'}
    ]
    return jsonify(chapters)