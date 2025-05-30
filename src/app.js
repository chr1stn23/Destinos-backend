// app.js (antes `src/app.js`)
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const subscriberRoutes = require('./routes/subscriberRoutes');
const subscriberAuthRoutes = require('./routes/subscriberAuthRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const contentTypeRoutes = require('./routes/contentTypeRoutes');
const contentRoutes = require('./routes/contentRoutes');
const magazineRoutes = require('./routes/magazineRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/public/magazines', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // O tu dominio específico
    next();
});

// Sirve la carpeta pública general (opcional si quieres exponer más cosas)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth/subscribers', subscriberAuthRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/content-types', contentTypeRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/magazines', magazineRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
