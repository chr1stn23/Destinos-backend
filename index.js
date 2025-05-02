// index.js
require('dotenv').config();  // Asegúrate de cargar las variables de entorno al principio
const app = require('./src/app'); // Ahora el `app.js` contiene tanto la configuración como las rutas
const sequelize = require('./src/config/database'); // Se asume que aquí está la conexión a la base de datos

const PORT = process.env.PORT || 3000;

// Manejo de conexión y inicio del servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');

        await sequelize.sync(); // Sincroniza los modelos con la BD
        console.log('Modelos sincronizados con la base de datos');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar la aplicación:', error.message);
        process.exit(1);  // Si ocurre un error, salimos con código 1
    }
};

startServer(); // Llamada para iniciar el servidor
