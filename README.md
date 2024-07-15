# api_libros

La API cuenta con 4 endpoints para agregar información a la base de datos. Estos endpoins son de tipo "GET" y aceptan un único parámetro:
1. /authors con query param "author"
2. /categories con query param "category"
3. /publisher con query param "publisher"
4. /books con query param "book"

Adicionalmente, desde el frontend ,se puede interactuar con las siguientes operaciones CRUD:

1. /libros-por-autor/{autor}, el cual retorna los libros que un autor ha escrito.
2. /libros-por-categoria/{categoria}, el cual retorna los libros dada una categoría.
3. /libros-por-editorial/{editorial}, el cual retorna los libros dada una editorial.
4. /autores-libros-por-categoria/{categoria}, el cual retorna los autores para una categoría específica.

NOTA: Puesto que no se implementó búsqueda difusa o búsqueda por coincidencia, se debe escribir la opción de manera exacta (i.e. Franz Kafka retorna sus libros, pero no funcionará Franz, Kafka, Franz K, etc.).

En este orden de ideas, para poder tener una correcta interacción con la API, se deberá escribir cualquiera de las siguientes opciones para cada endpoint:

AUTORES:
* Stephen King
* Franz Kafka
* Orson Scott
* Gabriel Garcia Marquez

CATEGORIAS:
* drama
* comedia
* ciencia ficcion
* terror

EDITORIAL:
* Planeta
* Anaya
* Torre

NOTA: Tener en cuenta no escribir tildes y escribir las mayúsculas cuando sea necesario.