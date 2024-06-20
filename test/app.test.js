// test/app.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /hello', function () {
    it('should return Hello, world!', function (done) {
        request(app)
            .get('/hello')
            .expect(200)
            .expect('Hello, world!', done);
    });
});
