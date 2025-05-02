
module.exports = {
  secret: process.env.JWT_SECRET,  // Aquí debes colocar una clave secreta única y segura
  expiresIn: '1h'  // El token expirará en 1 hora (puedes cambiarlo a lo que necesites)
};
