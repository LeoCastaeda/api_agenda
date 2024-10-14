import request from 'supertest';
import { app } from '../src/server'; // Reemplaza con la ruta correcta de tu archivo app

describe('Contact API', () => {
  
  // Test para la creación de un contacto para un usuario
  it('should create a new contact for a user', async () => {
    // Primero, creamos un nuevo usuario
    const userRes = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
      });
    const userId = userRes.body.id;

    // Luego, creamos un contacto para ese usuario
    const contactRes = await request(app)
      .post(`/contacts/${userId}`)
      .send({
        name: 'Jane',
        lastName: 'Smith',
        mail: 'jane.smith@example.com',
        phone: '123456789',
      });

    // Verifica que la respuesta tiene código 201 (creado)
    expect(contactRes.statusCode).toEqual(201);
    
    // Verifica que el contacto ha sido creado con las propiedades correctas
    expect(contactRes.body).toHaveProperty('id');
    expect(contactRes.body.name).toBe('Jane');
    expect(contactRes.body.mail).toBe('jane.smith@example.com');
  });

  // Test para listar los contactos de un usuario
  it('should get user contacts in alphabetical order', async () => {
    const userRes = await request(app)
      .post('/users')
      .send({ name: 'John Doe' });
    const userId = userRes.body.id;

    // Creamos dos contactos
    await request(app)
      .post(`/contacts/${userId}`)
      .send({ name: 'Alice', lastName: 'Brown', mail: 'alice@example.com', phone: '12345' });
    await request(app)
      .post(`/contacts/${userId}`)
      .send({ name: 'Charlie', lastName: 'Black', mail: 'charlie@example.com', phone: '67890' });

    // Recuperamos la lista de contactos
    const res = await request(app).get(`/contacts/${userId}`);

    // Verifica que la respuesta tiene código 200 (OK)
    expect(res.statusCode).toEqual(200);
    
    // Verifica que los contactos están en orden alfabético
    expect(res.body[0].name).toBe('Alice');
    expect(res.body[1].name).toBe('Charlie');
  });

  // Test para marcar un contacto como preferido
  it('should mark a contact as favorite', async () => {
    // Primero, creamos un usuario y un contacto
    const userRes = await request(app)
      .post('/users')
      .send({ name: 'John Doe' });
    const userId = userRes.body.id;

    const contactRes = await request(app)
      .post(`/contacts/${userId}`)
      .send({
        name: 'Jane',
        lastName: 'Smith',
        mail: 'jane.smith@example.com',
        phone: '123456789',
      });
    const contactId = contactRes.body.id;

    // Marcamos el contacto como favorito
    const res = await request(app)
      .patch(`/contacts/${contactId}/favoritas`);

    // Verifica que la respuesta tiene código 200 (OK)
    expect(res.statusCode).toEqual(200);
    
    // Verifica que el contacto ha sido marcado como favorito
    expect(res.body.favorite).toBe(true);
  });

  // Test para eliminar un contacto
  it('should delete a contact', async () => {
    const userRes = await request(app)
      .post('/users')
      .send({ name: 'John Doe' });
    const userId = userRes.body.id;

    const contactRes = await request(app)
      .post(`/contacts/${userId}`)
      .send({
        name: 'Jane',
        lastName: 'Smith',
        mail: 'jane.smith@example.com',
        phone: '123456789',
      });
    const contactId = contactRes.body.id;

    // Eliminamos el contacto
    const res = await request(app)
      .delete(`/contacts/${contactId}`);

    // Verifica que la respuesta tiene código 200 (OK)
    expect(res.statusCode).toEqual(200);
    
    // Verifica que el contacto fue eliminado
    expect(res.body.message).toBe('Contact deleted successfully');
  });

  // Test para recuperar un contacto eliminado
  it('should recover a deleted contact', async () => {
    const userRes = await request(app)
      .post('/users')
      .send({ name: 'John Doe' });
    const userId = userRes.body.id;

    const contactRes = await request(app)
      .post(`/contacts/${userId}`)
      .send({
        name: 'Jane',
        lastName: 'Smith',
        mail: 'jane.smith@example.com',
        phone: '123456789',
      });
    const contactId = contactRes.body.id;

    // Eliminamos el contacto
    await request(app)
      .delete(`/contacts/${contactId}`);

    // Recuperamos el contacto eliminado
    const res = await request(app)
      .patch(`/contacts/${contactId}/recover`);

    // Verifica que la respuesta tiene código 200 (OK)
    expect(res.statusCode).toEqual(200);
    
    // Verifica que el contacto fue recuperado
    expect(res.body.deleted).toBe(false);
  });
});