const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer'); // importante para manejar errores de multer

const subscriberRoutes = require('./routes/subscriberRoutes');
const subscriberAuthRoutes = require('./routes/subscriberAuthRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const contentTypeRoutes = require('./routes/contentTypeRoutes');
const contentRoutes = require('./routes/contentRoutes');
const magazineRoutes = require('./routes/magazineRoutes');
const userRoutes = require('./routes/userRoutes');
const interactiveVideoRoutes = require('./routes/interactiveVideoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/auth/subscribers', subscriberAuthRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/content-types', contentTypeRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/magazines', magazineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interactive-videos', interactiveVideoRoutes);
app.use('/api/upload', uploadRoutes);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === 'Tipo de archivo no permitido') {
        return res.status(400).json({ error: err.message });
    }

    console.error('Error no manejado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
