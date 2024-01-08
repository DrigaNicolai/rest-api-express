const request = require('supertest');
const app = require('../app');

let authToken;
let authorId;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post('/auth/login')
    .send({ email: "root@gmail.com", password: "123456789" }); // pc: 123456789; laptop: 123456qwerty

  authToken = loginResponse.body.token;
  authorId = loginResponse.body.user.id;
});

describe("Catalog Posts Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/posts');
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an array of objects with specific properties', () => {
    const responseData = response.body;

    expect(responseData.items).toBeInstanceOf(Array);
    expect(responseData.items).not.toHaveLength(0);
    
    responseData.items.forEach((post) => {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('text');
      expect(post).toHaveProperty('tag');
      expect(post).toHaveProperty('createdAt');
      expect(post).toHaveProperty('updatedAt');
    });
  });
});

describe("Create Post Tests", () => {
  let response;
  let startTime;

  beforeAll(async () => {
    startTime = Date.now();
    response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('author_id', authorId)
      .field('title', 'Test title 3')
      .field('text', 'Test text third')
      .field('tag_id', 1);
  });

  it('should return a 201 status code', () => {
   expect(response.statusCode).toBe(201);
  });

  it('response is an object with id, author_id, title, text, tag_id createdAt, and updatedAt properties', () => {
    const responseData = response.body;
    
    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('author_id');
    expect(responseData).toHaveProperty('title');
    expect(responseData).toHaveProperty('text');
    expect(responseData).toHaveProperty('tag_id');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('updatedAt');
  });

  it('should have a response time below 500ms', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(responseTime).toBeLessThan(500);
  });
});

describe("Catalog User Posts Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/posts/user/${authorId}`);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an array of objects with specific properties', () => {
    const responseData = response.body;

    expect(responseData.items).toBeInstanceOf(Array);
    expect(responseData.items).not.toHaveLength(0);
    
    responseData.items.forEach((post) => {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('text');
      expect(post).toHaveProperty('tag');
      expect(post).toHaveProperty('createdAt');
      expect(post).toHaveProperty('updatedAt');
    });
  });
});

describe("Get one Post Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get('/posts/6')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an object with id, author_id, title, text, tag_id, createdAt, and updatedAt properties', () => {
    const responseData = response.body;

    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('author_id');
    expect(responseData).toHaveProperty('title');
    expect(responseData).toHaveProperty('text');
    expect(responseData).toHaveProperty('tag_id');
    expect(responseData).toHaveProperty('createdAt');
    expect(responseData).toHaveProperty('updatedAt');
  });
});

describe("Update Post Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put('/posts/6')
      .set('Authorization', `Bearer ${authToken}`)
      .send(
        {
          author_id: authorId,
          title: "Edited title",
          text: "Edited text",
          tag_id: 2
        }
      );
  });

  it('response status code is 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('response is an object with id, author_id, title, text, tag_id createdAt, and updatedAt properties', () => {
    const responseData = response.body;
    
    expect(responseData).toBeInstanceOf(Object);
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('author_id');
    expect(responseData).toHaveProperty('title');
    expect(responseData).toHaveProperty('text');
    expect(responseData).toHaveProperty('tag_id');
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

describe("Delete Post Tests", () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete('/posts/6')
      .set('Authorization', `Bearer ${authToken}`);
  });

  it('response status code is 204', () => {
    expect(response.statusCode).toBe(204);
  });

  it('response is an empty object', () => {
    expect(response.body).toEqual({});
  });
});
