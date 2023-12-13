import request from 'supertest';
import app from './../../app';

describe('GET /health', () => {
  it('response with 200', done => {
    request(app)
      .get('/health')
      .expect(200, done);
  });
})