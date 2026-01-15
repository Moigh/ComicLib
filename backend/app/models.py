from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Таблица связка Автор и Комикс
Author_Book = db.Table('author_book',
    db.Column('comicbook_id', db.Integer, db.ForeignKey('comicbook.id'), primary_key=True),
    db.Column('author_id', db.Integer, db.ForeignKey('author.id'), primary_key=True)
)

# Комикс
class ComicBook(db.Model):
    __tablename__ = 'comicbook' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    cover_image = db.Column(db.String(300))  # Ссылка
    year = db.Column(db.Date)
    
    chapters = db.relationship('Chapter', backref='comicbook', lazy=True)
    authors = db.relationship('Author', secondary=Author_Book, 
                            backref=db.backref('comicbooks', lazy=True))
    
    def to_dict(self):
        
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'cover_image': self.cover_image,
            'year': self.year,
            'authors': [author.to_dict() for author in self.authors],
            'chapters_count': len(self.chapters) if self.chapters else 0
        }

# Автор
class Author(db.Model):
    __tablename__ = 'author' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))

    def to_dict(self):        
        return {
            'id': self.id,
            'name': self.name,
            'comicbooks_count': len(self.comicbooks) if self.comicbooks else 0
        }

# Глава
class Chapter(db.Model):
    __tablename__ = 'chapter'
    id = db.Column(db.Integer, primary_key=True)
    comicbook_id = db.Column(db.Integer, db.ForeignKey('comicbook.id'), nullable=False)
    chapter_number = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(200))
    
    pages = db.relationship('Page', backref='chapter', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'comicbook_id': self.comicbook_id,
            'chapter_number': self.chapter_number,
            'name': self.name,
            'pages_count': len(self.pages) if self.pages else 0
        }

# Страница
class Page(db.Model):
    __tablename__ = 'page'
    id = db.Column(db.Integer, primary_key=True)
    chapter_id = db.Column(db.Integer, db.ForeignKey('chapter.id'), nullable=False)
    page_number = db.Column(db.Integer, nullable=False)
    page_image = db.Column(db.String(300), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'chapter_id': self.chapter_id,
            'page_number': self.page_number,
            'page_image': self.page_image
        }