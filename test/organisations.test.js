import request from 'supertest';
import app from '../server.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import dotenv from 'dotenv';
dotenv.config();

describe('GET /organisations', () => {
    it('should return a list of Organisations', (done) => {
        request(app)
            .get('/organisations')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /organisations', () => {
    let org_id;

    it('should create a new organisation entry', (done) => {
        request(app)
            .post('/organisations')
            .send({ name: 'Company Name', contact_email: 'company@email.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    // afterEach(async () => {
    //     const orgGetUnique = await prisma.organisations.findUnique({
    //         where: {
    //             name: 'Company Name',
    //             contact_email: 'company@email.com'
    //         },
    //     })
    //     org_id = orgGetUnique.org_id

    //     await prisma.organisations.delete({
    //         where: { org_id: orgId }
    //     });
    // });
});

describe('POST /organisations', () => {
    it('should error because of incorrect email', (done) => {
        request(app)
            .post('/organisations')
            .send({ name: 'Good Company', contact_email: 'notarealemail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

describe('POST /organisations', () => {
    it('should error because of incorrect company name', (done) => {
        request(app)
            .post('/organisations')
            .send({ name: '', contact_email: 'realemail@email.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

describe('GET /organisations/:org_id', () => {
    let orgId;

    beforeEach(async () => {
        const result = await prisma.organisations.create({
            data: {
                name: 'Test org',
                contact_email: 'email@email.com'
            }
        });
        orgId = result.org_id;
    });

    afterEach(async () => {
        await prisma.organisations.delete({
            where: { org_id: orgId }
        });
    });

    it('should return a single organisation', (done) => {
        request(app)
            .get(`/organisations/${orgId}`)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should return an error for non-existent org_id', (done) => {
        request(app)
            .get('/organisations/999999')
            .expect('Content-Type', /json/)
            .expect(404, done); // Assuming 404 for not found
    });

    it('should return an error for invalid org_id format', (done) => {
        request(app)
            .get('/organisations/abc1')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('should return an error for negative org_id', (done) => {
        request(app)
            .get('/organisations/-12')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('should return an error for org_id of 0', (done) => {
        request(app)
            .get('/organisations/0')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

if (process.env.NODE_ENV === 'development') {
    describe('DELETE /organisations/:org_id', () => {
        let orgId;

        beforeEach(async () => {
            const result = await prisma.organisations.create({
                data: {
                    name: 'Test org',
                    contact_email: 'email@email.com'
                }
            });
            orgId = result.org_id;
        });

        it('should delete a single organisation', (done) => {
            request(app)
                .delete(`/organisations/${orgId}`)
                .expect('Content-Type', /json/)
                .expect(200, done())
        });

        afterEach(async () => {
            try {
                await prisma.organisations.delete({
                    where: { org_id: orgId }
                });
            } catch (error) {
                if (error.code !== 'P2025') {
                    throw error;
                }
            }
        });
    });


    describe('DELETE /organisations/:org_id', () => {
        it('should error due to non-int param', (done) => {
            request(app)
                .delete('/organisations/abc')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });

        it('should error due to number less than 1', (done) => {
            request(app)
                .delete('/organisations/-12')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });
}
