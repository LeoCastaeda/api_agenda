# Agenda de Contactes API

Una API REST creada con Express y TypeScript que permite a los usuarios crear y gestionar una agenda de contactos. La API sigue el patrón de arquitectura MVC, utilizando MySQL como base de datos y Prisma como ORM para la persistencia de datos.

## Requisitos

- Node.js
- MySQL
- Prisma
- TypeScript
- Nodemon
- Extensión REST Client para VS Code

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LeoCastaeda/api_agenda.git

2. Instala dependencias:

```
npm install
```

### Configura la base de datos MySQL en el archivo .env:
```
Copiar código
DATABASE_URL="mysql:usuario:contraseña@localhost:3306/agenda"
```

### Ejecuta las migraciones de Prisma para crear las tablas en la base de datos:
```
bash
Copiar código
npx prisma migrate dev --name init
```
### Compila el proyecto de TypeScript a JavaScript:
```
npx tsc
```

### Inicia el servidor:
```
bash
Copiar código
npm run start
```


### Funcionalidades

## Nivel 1


Implementa las siguientes funcionalidades para la gestión de contactos:

- **POST** /contacts → Añadir un contacto a la lista.

- **DELETE** /contacts/:contactId → Eliminar un contacto de la lista.

- **PUT** /contacts/:contactId → Actualizar la información de un contacto.

- **PATCH** /contacts/:contactId/favorites → Marcar o desmarcar un contacto como preferido.

- **PATCH** /contacts/:contactId/recover → Recuperar un contacto eliminado.

- GET /contacts → Mostrar la lista de contactos.

### Gestión de errores

La API devuelve mensajes personalizados en los siguientes casos:

- Intento de crear un contacto con un formato incorrecto.
- Intento de buscar, actualizar o eliminar un contacto inexistente.

## Nivel 2

Añade la gestión de usuarios para que cada usuario pueda tener su propia lista de contactos:

- **POST** /users → Crear un usuario.

- **PATCH** /users/{userId} → Modificar el nombre del usuario.

- **POST** /contacts/{userId} → Añadir un contacto a la lista de un usuario.

- **GET** /contacts/{userId} → Mostrar la lista de contactos de un usuario, ordenados alfabéticamente por nombre.

- **GET** /contacts/{userId}/favorites → Mostrar a un usuario sus contactos marcados como preferidos.

- **GET** /contacts/{userId}/deleted → Mostrar a un usuario los contactos que ha eliminado.

## Nivel 3
Añade pruebas para comprobar el correcto funcionamiento de cada endpoint.

### Ejecución de pruebas
Para ejecutar las pruebas, utiliza el siguiente comando:
```
bash
Copiar código
npm test
```

### Tecnologías utilizadas
- Express: Framework para crear la API REST.
- TypeScript: Lenguaje utilizado para el desarrollo del proyecto.
- MySQL: Base de datos relacional utilizada para la persistencia de datos.
- Prisma: ORM utilizado para interactuar con la base de datos.
- Jest: Framework de testing para realizar pruebas unitarias.
- Supertest: Permite peticiones a APIs/http y evalua las respuestas.

### Estructura del proyecto
- El proyecto sigue la arquitectura MVC (Modelo-Vista-Controlador), organizada de la siguiente manera:
```
bash
Copiar código
src/
 ├── controllers/    
 ├── models/prisma         
 ├── routes/                    
 └── tests/
└── server/        
```
 
## Contribuciones
Las contribuciones son bienvenidas. Si encuentras algún problema o tienes una sugerencia, abre un issue o envía un pull request.

### Licencia
Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.
