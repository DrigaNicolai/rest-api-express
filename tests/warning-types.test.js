const request = require('supertest');
const app = require('../app');

let authToken;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post('/auth/login')
    .send({ email: "root@gmail.com", password: "123456789" });

  
  authToken = loginResponse.body.token;
});

describe("Catalog WarningTypes Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/warning-types')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an array of objects with specific properties', () => {
    const responseData = response.body;

    expect(responseData).toBeInstanceOf(Array);
    expect(responseData).not.toHaveLength(0);
    
    responseData.forEach((warningType) => {
      expect(warningType).toHaveProperty('id');
      expect(warningType).toHaveProperty('name');
      expect(warningType).toHaveProperty('points_number');
      expect(warningType).toHaveProperty('createdAt');
      expect(warningType).toHaveProperty('updatedAt');
    });
  });
});

describe("Create WarningType Tests", () => {
  let response;
  let startTime;

  beforeAll(async () => {
    startTime = Date.now();
    response = await request(app)
      .post('/warning-types')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'Test name 10')
      .field('points_number', '1');
  });

  it('should return a 201 status code', () => {
   expect(response.statusCode).toBe(201);
  });

  it('response is an object with id, name, points_number, createdAt, and updatedAt properties', () => {
    const responseData = response.body;
    
    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('points_number');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('updatedAt');
  });

  it('should have a response time below 500ms', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(responseTime).toBeLessThan(500);
  });
});

describe("Get one WarningType Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/warning-types/9')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an object with id, name, points_number, createdAt, and updatedAt properties', () => {
    const responseData = response.body;

    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('points_number');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('updatedAt');
  });
});

describe("Get WarningTypes List Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/warning-types/list')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an array of objects with specific properties', () => {
    const responseData = response.body;

    expect(responseData).toBeInstanceOf(Array);
    expect(responseData).not.toHaveLength(0);

    responseData.forEach((item) => {
      expect(item).toBeInstanceOf(Object);
      expect(item).toHaveProperty('value');
      expect(item).toHaveProperty('text');
    });
  });
});

describe("Update WarningType Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put('/warning-types/9')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: "Test name EDITED", points_number: 3 });
  });

  it('response status code is 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an object with id, name, points_number, createdAt, and updatedAt properties', () => {
    const responseData = response.body;

    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('points_number');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('updatedAt');
  });

  it('createdAt should be different from updatedAt', () => {
    const responseData = response.body;

    expect(responseData.createdAt).not.toEqual(responseData.updatedAt);
  });

  it('updatedAt should be greater than createdAt', () => {
    const responseData = response.body;

    expect(new Date(responseData.updatedAt).getTime()).toBeGreaterThan(new Date(responseData.createdAt).getTime());
  });
});

describe("Delete WarningType Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete('/warning-types/9')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('response status code is 204', () => {
    expect(response.statusCode).toBe(204);
  });

  it('response is an empty object', () => {
    expect(response.body).toEqual({});
  });
});
