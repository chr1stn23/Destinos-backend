const { User } = require('../models/models');

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { full_name, username,password , email, role } = req.body;

    const newUser = await User.create({ full_name, username, password,email , role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener un usuario por su ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, username, password,email , role } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.full_name = full_name || user.full_name;
    user.username = username || user.username;
    user.password = password || user.password;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };