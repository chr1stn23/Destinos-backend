require('dotenv').config(); // Carga las variables del archivo .env

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'destinos_db_dev',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME_TEST || 'destinos_db_test',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME_PROD || 'destinos_db',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql'
    }
};
