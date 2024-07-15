from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from .dependencies.db import engine, get_db
from .models import Author, Base, Books, Category, Publisher
from .schemas import AuthorCreate, BookCreate, CategoryCreate, PublisherCreate


def current_dir(file):
    return Path(file).parent.absolute()


abs_path = current_dir(__file__)
templates = Jinja2Templates(abs_path)

app = FastAPI()


app.mount(
    "/static", StaticFiles(directory=abs_path / "static"), name="static")

Base.metadata.create_all(bind=engine)


@app.get('/')
async def read_template(request: Request):
    return templates.TemplateResponse("static/index.html", {"request": request})


@app.post("/authors", response_model=AuthorCreate)
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    db_author = Author(Autor=author.Autor)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author


@app.post("/categories", response_model=CategoryCreate)
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    db_category = Category(Categoria=category.Categoria)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


@app.post("/publisher", response_model=PublisherCreate)
def create_Publisher(publisher: PublisherCreate, db: Session = Depends(get_db)):
    db_publisher = Publisher(Editorial=publisher.Editorial)
    db.add(db_publisher)
    db.commit()
    db.refresh(db_publisher)
    return db_publisher


@app.post("/books", response_model=BookCreate)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = Books(
        Titulo=book.Titulo,
        Fecha_publicacion=book.Fecha_publicacion,
        idAutor=book.idAutor,
        idCategoria=book.idCategoria,
        idEditorial=book.idEditorial,
        Idioma=book.Idioma,
        Paginas=book.Paginas
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


@app.get('/libros-por-autor/{autor}')
async def get_all_books_from_author(autor: str, db=Depends(get_db)):
    author = db.query(Author).filter(Author.Autor == autor).first()
    if author:
        books = db.query(Books).filter(Books.idAutor == author.idAutor).all()

        return [{'Autor': book.Autor.Autor,
                 'Titulo': book.Titulo,
                 'Categoria': book.Categoria.Categoria,
                 'Editorial': book.Editorial.Editorial,
                 'Idioma': book.Idioma,
                 'Paginas': book.Paginas} for book in books]

    return HTTPException(404, 'No se encontró el autor')


@app.get('/libros-por-categoria/{categoria}')
async def get_all_books_from_author(categoria: str, db=Depends(get_db)):
    category = db.query(Category).filter(
        Category.Categoria == categoria).first()
    if category:
        books = db.query(Books).filter(
            Books.idCategoria == category.idCategoria).all()

        return [{'Autor': book.Autor.Autor,
                 'Titulo': book.Titulo,
                 'Categoria': book.Categoria.Categoria,
                 'Editorial': book.Editorial.Editorial,
                 'Idioma': book.Idioma,
                 'Paginas': book.Paginas} for book in books]

    return HTTPException(404, 'No se encontró la categoria')


@app.get('/libros-por-editorial/{editorial}')
async def get_all_books_from_author(editorial: str, db=Depends(get_db)):
    publisher = db.query(Publisher).filter(
        Publisher.Editorial == editorial).first()
    if publisher:
        books = db.query(Books).filter(
            Books.idEditorial == publisher.idEditorial).all()

        return [{'Autor': book.Autor.Autor,
                 'Titulo': book.Titulo,
                 'Categoria': book.Categoria.Categoria,
                 'Editorial': book.Editorial.Editorial,
                 'Idioma': book.Idioma,
                 'Paginas': book.Paginas} for book in books]

    return HTTPException(404, 'No se encontró la editorial')


@app.get('/autores-libros-por-categoria/{categoria}')
async def get_all_books_from_author(categoria: str, db=Depends(get_db)):
    category = db.query(Category).filter(
        Category.Categoria == categoria).first()
    if category:
        books = db.query(Books).filter(
            Books.idCategoria == category.idCategoria).all()

        return set(book.Autor.Autor for book in books)

    return HTTPException(404, 'No se encontraron los autores para esa categoría')
