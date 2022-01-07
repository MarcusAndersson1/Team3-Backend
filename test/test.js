const request = require('supertest');
const app = require('../app');

// https://www.npmjs.com/package/supertest
describe('GET /users', function() {
  it('Correct return type', function(done) {
    request(app)
      .get('/users')
      .expect('Content-Type', 'application/json; charset=utf-8', done)
  });
}); 

describe('GET /users', function() {
  it('Correct status code (Success)', function(done) {
    request(app)
      .get('/users')
      .expect(200, done);
  });
}); 

describe('GET /userss', function() {
  it('Correct status code (Error)', function(done) {
    request(app)
      .get('/userss')
      .expect(404, done);
  });
}); 

describe('POST /user/login', function() {
  it('Expect successfull login', function(done) {
    request(app)
      .post('/users/login')
      .send({email:'hej', password:'hej'})
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

describe('POST /user/login', function() {
  it('Expect error on login', function(done) {
    request(app)
      .post('/users/login')
      .send({email:'asdfasdf', password:'hej'})
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});