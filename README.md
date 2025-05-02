# Destinos_Backend

# Web Backend

2. Asegúrate de tener instalado **MySQL** o el gestor de base de datos que se esté utilizando.
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno configuradas:
   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_tu_base_de_datos
   DB_NAME_PROD=nombre_de_bd_de_produccion
   DB_PORT=3306
   JWT_SECRET=contraseña_muy_segura
   EMAIL_USER=correo@dominio
   EMAIL_PASS=password
   BACKEND_BASE_URL=http://localhost:3000
   FRONTEND_BASE_URL=http://localhost:5173

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener lo siguiente instalado:

- **Node.js** (recomendado v16.x o superior)
- **MySQL** o el gestor de base de datos que estés utilizando.
- **Postman** para probar los endpoints (opcional, pero recomendado).

## Instalación

1. **Instalar dependencias**:  
   Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

   npm install

*Configuración de la Base de Datos*
Asegúrate de tener MySQL instalado y funcionando. Si usas otro gestor de base de datos, ajusta la configuración en consecuencia.

*Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno configuradas:*

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
DB_PORT=3306
JWT_SECRET=tu_clave_secreta_jwt
DB_HOST: Dirección del servidor de base de datos (generalmente localhost).

DB_USER: El usuario para acceder a la base de datos.

DB_PASSWORD: La contraseña del usuario de la base de datos.

DB_NAME: El nombre de la base de datos que utilizarás para el proyecto.

DB_PORT: Puerto de conexión a la base de datos (usualmente 3306 para MySQL).

JWT_SECRET: Clave secreta que se usará para firmar los tokens JWT.

*Crear la base de datos:*
Si aún no has creado la base de datos, asegúrate de crearla en MySQL o el gestor de base de datos que estés utilizando.

*Ejecutar las migraciones:*
Ejecuta las migraciones para crear las tablas necesarias (como users y subscribers) en la base de datos:

npx sequelize-cli db:migrate

*Ejecutar el seeder:*
Si deseas poblar la base de datos con datos de prueba para los suscriptores:

npx sequelize-cli db:seed:all

*Ejecutar el Servidor*
Para iniciar el servidor, ejecuta el siguiente comando:

npm start

El servidor se ejecutará en el puerto 3000 de forma predeterminada, pero puedes cambiar esto en el archivo app.js.

## Uso de Postman para probar la API
Postman es una herramienta para probar las API. Puedes usarla para enviar solicitudes HTTP a tu servidor y verificar que los endpoints están funcionando correctamente.

*Prueba de autenticación:*

Para autenticarte, puedes usar el endpoint de login (por ejemplo, /api/login), enviando un usuario y contraseña en el cuerpo de la solicitud. Este endpoint devolverá un token JWT que puedes usar para autenticarte en otros endpoints.

*Probar CRUD de Suscriptores:*

Usa los siguientes endpoints para gestionar suscriptores:

GET /api/subscribers: Obtener todos los suscriptores.

POST /api/subscribers: Crear un nuevo suscriptor.

PUT /api/subscribers/:email: Actualizar la información de un suscriptor.

DELETE /api/subscribers/:email: Eliminar un suscriptor.

Asegúrate de incluir el token JWT en el encabezado Authorization de la solicitud para autenticarte.

*Probar CRUD de Usuarios:*

Si deseas probar los endpoints relacionados con los usuarios (si los tienes en tu proyecto):

POST /api/users: Crear un nuevo usuario.

GET /api/users: Obtener todos los usuarios.

PUT /api/users/:id: Actualizar un usuario.

**Verificar la conexión a la base de datos**
Si encuentras errores, revisa la configuración del archivo .env y asegúrate de que el servicio de la base de datos esté en ejecución.