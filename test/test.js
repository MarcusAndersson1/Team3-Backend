const request = require('supertest');
const app = require('../app');

// https://www.npmjs.com/package/supertest
describe('App', function() {
  it('Status code and response', function(done) {
    request(app)
      .get('/test')
      .expect(/get test/)
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
}); 

describe('App', function() {
  it('Correct response', function(done) {
    request(app)
      .post('/test')
      .expect(/post test/, done);
  });
}); 
