import request from 'supertest';

import rootServer from '../src/app';
const app = new rootServer().App;

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
