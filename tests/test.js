const { Subscriber } = require('../models'); // Importar el modelo de suscriptores
require('dotenv').config();

async function testSubscribers() {
  try {
    // Obtener todos los suscriptores
    const subscribers = await Subscriber.findAll();
    console.log('Suscriptores:', subscribers);

    // Crear un nuevo suscriptor
    const newSubscriber = await Subscriber.create({
      full_name: 'Mark Subscriber',
      email: 'mark@example.com',
      password: 'hashed_password_1',  // Asegúrate de que la contraseña esté hasheada si es necesario
      country: 'USA',
      city: 'Los Angeles',
      phone: '555123456',
      company: 'Tech Solutions',
      job_title: 'Engineer',
      subscribed_at: new Date(),
      last_login: new Date(),
      is_active: true,
      is_confirmed: true,
      accepts_marketing: true,
      created_at: new Date(),
      updated_at: new Date()
    });
    console.log('Nuevo suscriptor creado:', newSubscriber);

    // Actualizar un suscriptor (ejemplo: cambiar la preferencia de marketing)
    const updatedSubscriber = await Subscriber.update(
      { accepts_marketing: false },
      { where: { email: 'mark@example.com' } }
    );
    console.log('Suscriptor actualizado:', updatedSubscriber);

    // Actualizar el estado de un suscriptor (ejemplo: desactivar cuenta)
    const updatedStatus = await Subscriber.update(
      { is_active: false },
      { where: { email: 'mark@example.com' } }
    );
    console.log('Estado de la cuenta del suscriptor actualizado:', updatedStatus);

    // Eliminar un suscriptor
    await Subscriber.destroy({ where: { email: 'mark@example.com' } });
    console.log('Suscriptor eliminado');
  } catch (error) {
    console.error('Error probando el modelo Subscriber:', error);
  }
}

// Llamar a la función para probar los suscriptores
testSubscribers();

/*
  ** Código comentado para la tabla users (sin eliminar) **

  const User = require('../models/User'); // Ajusta la ruta según tu estructura

  async function testUsers() {
    try {
      // Obtener todos los usuarios
      const users = await User.findAll();
      console.log('Usuarios:', users);

      // Crear un nuevo usuario
      const newUser = await User.create({
        full_name: 'Alice Johnson',
        username: 'alicejohnson',
        email: 'alice@example.com',
        password: 'hashed_password_3',
        role: 'user'
      });
      console.log('Nuevo usuario creado:', newUser);

      // Actualizar un usuario
      const updatedUser = await User.update(
        { role: 'admin' },
        { where: { username: 'alicejohnson' } }
      );
      console.log('Usuario actualizado:', updatedUser);

      // Eliminar un usuario
      await User.destroy({ where: { username: 'alicejohnson' } });
      console.log('Usuario eliminado');
    } catch (error) {
      console.error('Error probando el modelo User:', error);
    }
  }

  testUsers();
*/

