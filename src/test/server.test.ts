import request from 'supertest';
import app from '../server'; 
import { prisma } from '../controllers/contactController';


describe('User API', () => {
  let userId: any;

  
  afterEach(async () => {
    if (userId) {
      await request(app).delete(`/users/${userId}`);
    }
  });

  
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'John Doe' });

    expect(res.statusCode).toEqual(201);
    userId = res.body.id; 
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
  });

  
  it('should return 500 if name is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({}); 

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });

  
  it('should update user name', async () => {
    
    const createRes = await request(app)
      .post('/users')
      .send({ name: 'Old Name' });

    const userId = createRes.body.id;

   
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        userId: userId, 
        name: 'Updated Name', 
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Name'); 
  });

  
  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .patch('/users/9999')
      .send({ name: 'New Name' });

    expect(res.statusCode).toEqual(404);
  });
});

describe('Contact API', () => {
  let userId: any;
  let contactId: any;

  beforeAll(async () => {
  
    const userRes = await prisma.user.create({
      data: { name: 'Test User' },
    });
    userId = userRes.id;

    
    const contact = await prisma.contact.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        userId,
      },
    });
    contactId = contact.id; 
  });

  
  it('should create a new contact for a user', async () => {
    const contactRes = await request(app)
      .post('/contacts')
      .send({
        userId,  
        firstName: 'Ja',
        lastName: 'Smit',
        email: 'jasmith@ex.com',
        phone: '123456789',
      });

    expect(contactRes.statusCode).toEqual(201);
    expect(contactRes.body).toHaveProperty('id');
  });

  
  it('should get user contacts in alphabetical order', async () => {
    await prisma.contact.createMany({
      data: [
        { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@exampl.com', phone: '1111', userId },
        { firstName: 'Alice', lastName: 'Wonderland', email: 'alice@exampl.com', phone: '2222', userId },
      ],
    });

    const res = await request(app).get('/contacts').send();

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].firstName).toBe('Alice');
    expect(res.body[1].firstName).toBe('Charlie');
  });

 
  it('should mark a contact as favorite', async () => {
    const res = await request(app).patch(`/contacts/${contactId}/favorites`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.isFavorite).toBe(true); 
  });

  
  it('should delete a contact', async () => {
    const res = await request(app).delete(`/contacts/${contactId}`);

    expect(res.statusCode).toEqual(200); 
  });

  
  it('should recover a deleted contact', async () => {
    const res = await request(app).patch(`/contacts/${contactId}/recover`); 

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('isDeleted', false);
  });
});


afterAll(async () => {
  
  await prisma.contact.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.$disconnect(); 
});
