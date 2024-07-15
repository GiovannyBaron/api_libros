from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .dependencies.db import Base


class Author(Base):
    __tablename__ = "Autores"

    idAutor = Column(Integer, primary_key=True)
    Autor = Column(String)

    Libros = relationship("Books", back_populates="Autor")


class Category(Base):
    __tablename__ = "Categorias"

    idCategoria = Column(Integer, primary_key=True)
    Categoria = Column(String)

    Libros = relationship("Books", back_populates="Categoria")


class Publisher(Base):
    __tablename__ = "Editorial"

    idEditorial = Column(Integer, primary_key=True)
    Editorial = Column(String)

    Libros = relationship("Books", back_populates="Editorial")


class Books(Base):
    __tablename__ = "Libros"

    id = Column(Integer, primary_key=True)
    Titulo = Column(String)
    Fecha_publicacion = Column(DateTime)

    idAutor = Column(Integer, ForeignKey("Autores.idAutor"))
    idCategoria = Column(Integer, ForeignKey("Categorias.idCategoria"))
    idEditorial = Column(Integer, ForeignKey("Editorial.idEditorial"))

    Autor = relationship("Author", back_populates="Libros")
    Categoria = relationship("Category", back_populates="Libros")
    Editorial = relationship("Publisher", back_populates="Libros")

    Idioma = Column(Integer)
    Paginas = Column(Integer)
