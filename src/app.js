const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/subscribers', require('./routes/subscriberRoutes'));
app.use('/api/auth/subscribers', require('./routes/subscriberAuthRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/content-types', require('./routes/contentTypeRoutes'))
app.use('/api/contents', require('./routes/contentRoutes'))
app.use('/api/magazines', require('./routes/magazineRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Exporta la app configurada (sin iniciar servidor)
module.exports = app;