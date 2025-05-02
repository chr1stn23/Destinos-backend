// services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');  // Asegúrate de tener el modelo User importado
const { secret } = require('../config/jwtConfig');  // Importamos la clave secreta desde jwtConfig

const authenticateUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secret,
    { expiresIn: '1h' }  // El token expirará en 1 hora
  );

  return token;
};

module.exports = { authenticateUser };
