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

NOTA: Tener en cuenta no escribir tíldes y escribir las mayúsculas cuando sea necesario.

# Desplegar un entorno de producción

Inicialmente, se debe contar con un repositorio que permita el acceso a este desde cualquier máquina. Por ejemplo, GitHub, Google Drive, servidores en la nube como AWS o GCP, etc.

En la mayoría de casos, estas mismas herramientas ya poseen algunas maneras para automatizar el despliegue a producción, pero existen otras herramientas bastante útiles como Jenkins. 

Para poder facilitar el despliegue, es recomendable el uso de contenedores. Por ejemplo, al usar Docker, mediante la herramienta "docker compose" se pueden adjuntar tanto las imágenes del código, como las imágenes por defecto para programas que no necesiten una configuración tan personalizada. Por ejemplo, Nginx, bases de datos como MongoDB o PostgreSQL, etc. Así mismo, estas se podrán interconectar mediante redes, almacenar volúmenes para evitar pérdidas en la base de datos si se desconecta el contenedor, entre otras ventajas.

El proceso de creación de un Docker se puede automatizar, haciendo posible la generación de una nueva imagen del código cada vez que esta cambie.

Finalmente, para desplegar con herramientas como Jenkins, se usará el concepto de "jobs", los cuales permiten un proceso para realizar el "pipeline" deseado. Se debe tener en cuenta qué tipo de pruebas se quieren para este punto, pues si se encuentran automatizadas pruebas, por ejemplo, de tipo unitario, se pueden ingresar estas al "pipeline" antes de que se realice el despliegue. De lo contrario, se cancela el proceso. 

Por último, se puede manejar archivos secretos como "llaves SSH" o "certificados SSL" tanto por las variables de entorno del "pipeline" como por el servidor web. Por ejemplo, usando Nginx.