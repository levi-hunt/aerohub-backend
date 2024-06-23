// test/app.test.js
import request from 'supertest';
import app from '../server.js';

describe('GET /organisations', () => {
    it('should return a list of Organisations', (done) => {
        request(app)
            .get('/organisations')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})

describe('POST /organisations', () => {
    it('should create a new organisation entry', (done) => {
        request(app)
            .post('/organisations')
            .send({ name: 'Company Name', contact_email: 'company@email.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})

describe('POST /organisations', () => {
    it('should error because of incorrect email', (done) => {
        request(app)
            .post('/organisations')
            .send({ name: 'Good Company', contact_email: 'notarealemail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe('POST /organisations', () => {
    it('should error because of incorrect company name', (done) => {
        request(app)
            .post('/organisations')
            .send({ name: '', contact_email: 'realemail@email.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe('GET /organisations/:org_id', () => {
    it('should return a single organisation', (done) => {
        request(app)
            .get('/organisations/1')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})

describe('GET /organisations/:org_id', () => {
    it('should return an error', (done) => {
        request(app)
            .get('/organisations/abc1')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe('GET /organisations/:org_id', () => {
    it('should return an error', (done) => {
        request(app)
            .get('/organisations/-12')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe('GET /organisations/:org_id', () => {
    it('should return a 400 error', (done) => {
        request(app)
            .get('/organisations/0')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})
