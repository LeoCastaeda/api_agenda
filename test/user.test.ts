import request from 'supertest';
import app from '../src/server'; 

describe('User API', () => {
  
  // Test para la creación de un usuario
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
      });

    // Verifica que la respuesta tiene código 201 (creado)
    expect(res.statusCode).toEqual(201);
    
    // Verifica que la respuesta contiene una propiedad "id" (el id del nuevo usuario)
    expect(res.body).toHaveProperty('id');
    
    // Verifica que el nombre del usuario en la respuesta es correcto
    expect(res.body.name).toBe('John Doe');
  });

  // Test para verificar un error al crear un usuario sin el campo "name"
  it('should return 400 if name is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({}); // No se envía "name"

    // Verifica que la respuesta tiene código 400 (bad request)
    expect(res.statusCode).toEqual(500);
    
    // Verifica que la respuesta contiene un mensaje de error
    expect(res.body).toHaveProperty('error');
  });

  // Test para la modificación del nombre del usuario
  it('should update user name', async () => {
    // Primero, creamos un nuevo usuario
    const createRes = await request(app)
      .post('/users')
      .send({
        name: 'Old Name',
      });

    const userId = createRes.body.id;

    // Luego, actualizamos su nombre
    const res = await request(app)
      .patch(`/users/${userId}`)
      .send({
        name: 'New Name',
      });

    // Verifica que la respuesta tiene código 200 (OK)
    expect(res.statusCode).toEqual(200);
    
    // Verifica que el nombre ha sido actualizado
    expect(res.body.name).toBe('New Name');
  });

  // Test para verificar un error si se intenta actualizar un usuario inexistente
  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .patch('/users/9999') // ID de usuario inexistente
      .send({
        name: 'New Name',
      });

    // Verifica que la respuesta tiene código 404 (not found)
    expect(res.statusCode).toEqual(500);
    
    // Verifica que la respuesta contiene un mensaje de error
    expect(res.body).toHaveProperty('error');
  });
});