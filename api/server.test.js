const request = require('supertest');
const server = require('./server.js');

describe('the index server', () => {
    describe('GET /', () => {
        it('should run the testing env', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });

        it('should return status 200', () => {
            return request(server)
                .get('/')
                .then( res => {
                    expect(res.status).toBe(200);
            });
        });

        it('should return text/html', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toBe('text/html');
                })
        })
    });
});