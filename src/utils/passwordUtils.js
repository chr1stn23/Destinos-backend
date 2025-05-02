const bcrypt = require('bcrypt');
const saltRounds = 10; // Coste del hasheo (mayor = más seguro pero más lento)

// Hashear contraseña
const hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, saltRounds);
};

// Comparar contraseña con hash
const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePasswords };