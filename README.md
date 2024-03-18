# Nombre del Proyecto

Breve descripción o resumen del proyecto.

## Comenzando

Estas instrucciones te ayudarán a iniciar y ejecutar el proyecto en tu máquina local para propósitos de desarrollo y pruebas.

### Prerequisitos

Qué cosas necesitas para instalar el software y cómo instalarlas.

Ejemplo:
Node.js
NPM

Copy code

### Instalación

Una serie de ejemplos paso a paso que te muestran cómo configurar un entorno de desarrollo.

Ejemplo:

Clona el repositorio: git clone https://github.com/tu_usuario/tu_repositorio.git
Instala las dependencias: npm install
shell
Copy code

### Iniciar el proyecto

Cómo iniciar el proyecto.

npm run dev

Copy code

## Uso

Cómo usar el proyecto y cómo interactuar con él.

Ejemplo:

Accede a la URL: http://localhost:3000/api/products
Realiza una solicitud HTTP (GET, POST, PUT, DELETE, etc.) según la ruta y el método necesario.
csharp
Copy code

## Esquemas de Datos

### Schema de Productos

```javascript
title: String de valor unico ,
    description: String,
    code: String de valor unico,
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: [
            'computadoras',
            'telefonos',
            'televisores',
            'accesorios',
            'electrodomésticos'
        ],
        required: true,
        index: true
    },
    thumbnails: {
        type: Array,
        default: []
    }
Schema del Carrito de Compra
No es necesario configurar un schema, ya que esta configurado con postman.
javascript


Schema de Mensajes de Chat
No es necesario configurar un schema, ya que el chat funciona internamente en una página.

Rutas
Las rutas disponibles en el proyecto.

api/products: Ruta para administrar productos.
api/carts: Ruta para administrar carritos de compra.
api/messages: Ruta para administrar mensajes de chat.
views/products
views/products/:pid
views/carts/:cid
Autores
Urbano Molina Molina