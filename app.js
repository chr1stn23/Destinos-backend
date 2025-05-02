require('dotenv').config();  // Cargar las variables de entorno

// Cargar la aplicación configurada desde `src/app.js`
const app = require('./src/app');

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
