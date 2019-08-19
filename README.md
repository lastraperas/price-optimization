# Las Traperas Price Optimization project

> [Las Traperas](https://www.lastraperas.com/) facilita el reuso y reciclaje
> de prendas en desuso reduciendo el impacto de la producción de prendas nuevas
> y concientizando sobre consumo responsable en el proceso.

> El ejemplo más claro de [*Price optimization*](https://en.wikipedia.org/wiki/Price_optimization),
> es lo que hacen las aerolíneas, que a medida que dependiendo de factores como,
> la epoca del año, la cercanía a la fecha del vuelo, etc, pueden establecer los
> precios de los vuelos de manera dínamica.

## Reto

### Contexto

En el mundo de la ropa de segunda mano, en especial en el Peru donde no contamos
con una coltura de reuso de ropa establecida, determinar los precios a los cuales
vender las prendas, es en sí un reto.

En Las Traperas, gracias a la experiencia ganada en años de prueba y error
hemos conseguido establecer una heurística de pricing, pero que sigue atada al
conocimiento de marcas, prendas, materiales, etc, que tenga la persona encargada
de recibir y asignarles un monto de venta a las prendas.

### Objetivo

El reto que estamos planteando a las egresadas consiste en entrenar y hacer
consumible (a través de una endpoint GraphQL) un **modelo predictivo que, dadas
determinadas características de una prenda, nos permita establecer el precio de
venta de una prenda**.

### Desarrollo

#### Introducción

El *price optimization* se hace desde hace mucho tiempo. Desde hace ya algunos
años se le ha dado un nuevo enfoque al problema, principalmente gracias a los
avances en el área de Machine Learning, que es donde nosotrxs nos vamos a enfocar.

Para realizar este proyecto usaremos un el [algoritmo Linear Lerner](https://www.geeksforgeeks.org/ml-linear-regression/)
de [Amazon SageMaker](https://aws.amazon.com/sagemaker/), para aplicar una
[`Linear Regression`](https://www.youtube.com/watch?v=CtKeHnfK5uA).

#### Implementacion

##### Data

Para poder entrenar al modelo necesitamos data, para ello utilizaremos 2 datasets
e intentaremos de identificar con cual información obtenemos mejores resultados.

El primer dataset es el extraido de nuestra base de datos, que tiene para cada
item el precio de venta, ademas de información como: marca, talla, fecha,
status (si se vendio o no), descripción, etc.

El segundo dataset sera compuesto por los precios del mercado establecidos para
productos nuevos. Nosotrxs por nuestra experiencia sabemos que el precio de un
producto usado es aproximadamente 1/3 del precio del mismo producto nuevo. Para
obtener esta información crearemos 3 [scrapers](https://es.wikipedia.org/wiki/Web_scraping)
que extraigan la información de
[falabella](https://www.falabella.com.pe/falabella-pe/category/cat4100462/Moda-Mujer?isPLP=1),
[ripley](https://simple.ripley.com.pe/mujer/marcas-moda-mujer/ver-todo-ropa-mujer)
y [topitop](https://topitop.pe/collections/mujer).

#### Contrucción

Haremos 2 notebooks, uno para cada set de datos, utilizando y optimizando el
algoritmo de [Linear Lerner](https://www.youtube.com/watch?v=ae08a6Bp5lM).

#### Entremamiento

Entrenaremos y optimizaremos el modelo dentro de SageMaker

#### Despliegue

Lo desplegaremos y definiremos una interfaz las `queries` de nuestro endpoint
GraphQL, desde donde consumiremos el modelo.