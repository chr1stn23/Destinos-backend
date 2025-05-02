  const jwt = require('jsonwebtoken');
  const { secret } = require('../config/jwtConfig'); // Usamos la configuración desde config

  const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'Token requerido' });
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido' });
      }

      req.user = user;
      next();
    });
  };
  const isAdmin = (req, res, next) => {
      const { role } = req.user;
    
      if (role !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
      }
    
      next();
    };
    
    const isEditorOrAdmin = (req, res, next) => {
      const { role } = req.user;
    
      if (role !== 'admin' && role !== 'editor') {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
      }
    
      next();
    };
    module.exports = {
      authenticateJWT,
      isAdmin,
      isEditorOrAdmin
    };