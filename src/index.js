require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

// Manejo de conexión y inicio del servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');

        await sequelize.sync(); // Sincroniza modelos con la BD
        console.log('Modelos sincronizados con la base de datos');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar la aplicación:', error.message);
        process.exit(1);
    }
};

startServer();