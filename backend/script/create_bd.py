import sys
import os
import json

current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir) 
sys.path.insert(0, backend_dir)

# 2. Теперь импортируем
from app import app
from app.models import db, ComicBook, Author, Chapter, Page

def create_data():
    with app.app_context():
        db.drop_all()
        db.create_all()
        
        json_path = os.path.join(current_dir, 'test_comics.json')
                
        with open(json_path, 'r', encoding='utf-8') as f:
            comics = json.load(f)
        
        print(f"Найдено {len(comics)} комиксов")
        
        authors_dict = {}
        all_authors = []
        
        for comic in comics:
            for author_name in comic['authors']:
                if author_name not in authors_dict:
                    author = Author(name=author_name)
                    authors_dict[author_name] = author
                    all_authors.append(author)
        
        db.session.add_all(all_authors)
        db.session.commit()
        print(f"👥 Авторов: {len(authors_dict)}")
        
        for comic_data in comics:
            print(f"{comic_data['name']}")
            
            comic = ComicBook(
                name=comic_data['name'],
                description=comic_data['description'],
                cover_image=comic_data['cover_image'],
                year=comic_data['year']
            )
            
            for author_name in comic_data['authors']:
                comic.authors.append(authors_dict[author_name])
            
            db.session.add(comic)
            db.session.commit()
            
            for chap in comic_data.get('chapters', []):
                chapter = Chapter(
                    comicbook_id=comic.id,
                    chapter_number=chap['number'],
                    name=chap['name']
                )
                db.session.add(chapter)
                db.session.commit()
                
                for pag in chap.get('pages', []):
                    page = Page(
                        chapter_id=chapter.id,
                        page_number=pag['number'],
                        page_image=pag['image']
                    )
                    db.session.add(page)
                
                db.session.commit()
        
        print(f"\n🎉 ГОТОВО! Создано: {len(comics)} комиксов")

if __name__ == "__main__":
    create_data()