from datetime import datetime

from pydantic import BaseModel


class AuthorCreate(BaseModel):
    Autor: str

    class Config:
        orm_mode = True


class CategoryCreate(BaseModel):
    Categoria: str

    class Config:
        orm_mode = True


class PublisherCreate(BaseModel):
    Editorial: str

    class Config:
        orm_mode = True


class BookCreate(BaseModel):
    Titulo: str
    Fecha_publicacion: datetime
    idAutor: int
    idCategoria: int
    idEditorial: int
    Idioma: str
    Paginas: int

    class Config:
        orm_mode = True
