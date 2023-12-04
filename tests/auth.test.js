const request = require('supertest');
const app = require('../app');

describe("Registration Tests", () => {
  let registrationResponse;
  let startTime;

  beforeAll(async () => {
    startTime = Date.now();
    registrationResponse = await request(app)
      .post('/auth/register')
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'Test15 name')
      .field('email', 'test15@gmail.com')
      .field('password', '123456qwerty');
  });

  it('should return a 201 status code', () => {
    expect(registrationResponse.statusCode).toBe(201);
  });

  it('should have a non-empty response message', () => {
    expect(registrationResponse.body.message).toBeTruthy();
  });

  it('should have a valid response message format', () => {
    expect(registrationResponse.body).toEqual(expect.objectContaining({
      message: expect.any(String),
    }));
  });

  it('should have the required fields in the response', () => {
    expect(registrationResponse.body).toEqual(expect.objectContaining({
      message: expect.any(String),
    }));
  });

  it('should have a response time below 500ms', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(responseTime).toBeLessThan(500);
  });
});

describe("Login Tests", () => {
  let loginResponse;

  beforeAll(async () => {
    loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: "test4@gmail.com", password: "123456qwerty" });
  });

  it('should return a 200 status code', () => {
    expect(loginResponse.statusCode).toBe(200);
  });

  it('token is present in the response', () => {
    expect(loginResponse.body.token).toBeDefined();
  });

  it('user object has the required fields', () => {
    const user = loginResponse.body.user;

    expect(user).toBeInstanceOf(Object);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
  });

  it('email is in a valid email format', () => {
    const email = loginResponse.body.user.email;

    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('role is a valid role value', () => {
    const role = loginResponse.body.user.role;

    expect(['Admin', 'User', 'Moderator']).toContain(role);
  });
});
