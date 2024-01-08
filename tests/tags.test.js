const request = require('supertest');
const app = require('../app');

let authToken;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post('/auth/login')
    .send({ email: "root@gmail.com", password: "123456789" }); // pc: 123456789; laptop: 123456qwerty

  authToken = loginResponse.body.token;
});

describe("Catalog Tags Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/tags')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an array of objects with specific properties', () => {
    const responseData = response.body;

    expect(responseData.items).toBeInstanceOf(Array);
    expect(responseData.items).not.toHaveLength(0);
    
    responseData.items.forEach((tag) => {
      expect(tag).toHaveProperty('id');
      expect(tag).toHaveProperty('name');
      expect(tag).toHaveProperty('description');
      expect(tag).toHaveProperty('createdAt');
      expect(tag).toHaveProperty('updatedAt');
    });
  });
});

describe("Create Tag Tests", () => {
  let response;
  let startTime;

  beforeAll(async () => {
    startTime = Date.now();
    response = await request(app)
      .post('/tags')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'test_tag_third')
      .field('description', 'Description for the test_tag 3');
  });

  it('should return a 201 status code', () => {
   expect(response.statusCode).toBe(201);
  });

  it('response is an object with id, name, description, createdAt, and updatedAt properties', () => {
    const responseData = response.body;
    
    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('description');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('updatedAt');
  });

  it('should have a response time below 500ms', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(responseTime).toBeLessThan(500);
  });
});

describe("Get one Tag Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/tags/3')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an object with id, name, description, createdAt, and updatedAt properties', () => {
    const responseData = response.body;

    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('description');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('updatedAt');
  });
});

describe("Get WarningTypes List Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/tags/list')
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

describe("Update Tag Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put('/tags/3')
      .set('Authorization', `Bearer ${authToken}`)
      .send(
        { 
          name: "test_tag_third_edited", 
          description: "Description for the test_tag 3 edited"
        }
      );
  });

  it('response status code is 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an object with id, name, description, createdAt, and updatedAt properties', () => {
    const responseData = response.body;

    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('name');
    expect(responseData).toHaveProperty('description');
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

describe("Delete Tag Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete('/tags/3')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('response status code is 204', () => {
    expect(response.statusCode).toBe(204);
  });

  it('response is an empty object', () => {
    expect(response.body).toEqual({});
  });
});
