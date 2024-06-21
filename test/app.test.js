// test/app.test.js
import request from 'supertest';
import app from '../server.js';

describe('GET /hello', function () {
    it('should return Hello, world!', function (done) {
        request(app)
            .get('/hello')
            .expect(200)
            .expect('Hello, world!', done);
    });
});
