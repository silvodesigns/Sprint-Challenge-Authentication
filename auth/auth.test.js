const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require("../api/server.js");
const Users = require('../users/users-model.js');



describe('the auth endpoint', () => {

    beforeEach(async () => {
        await db('users').truncate();
        await db('users').insert({
            username: "test1",
            password: "hello123"
        })
    });

    describe('post / register', () => {

        it('should register a new user', async () => {

                const userData = { 
                    username: "jose",
                    password: "hellow"
                }
                await Users.add(userData);

                const users = await db('users');
                expect(users.length).toBe(2);
            
            });


            it('should resolve to the newly created user', async () => {

                const userData = { 
                    username: "jose",
                    password: "hellow"
                }
               const user = await Users.add(userData);

               expect(user).toEqual({
                   id:2,
                   username: "jose",
                   password: "hellow"
               })
            });
        });

        describe('post/ login', () => {

            it('user should log in succesfully', async() => {
                const results = await request(server)
                    .post("/api/auth/login")
                    .send({username: "test1", password:"hello123"})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)

                    expect(results.status).toBe(200);
            });

            it('user should failt to log in ', async() => {
                const results = await request(server)
                    .post("/api/auth/login")
                    .send({username: "wrong", password:"wrong"})
                    
                    expect(results.status).toBe(401);
            });

        });


        describe('get/ jokes', ()=> {
            it('it should fail to get jokes due to not being auth', async()=> {
                const results = await request(server).get("/api/jokes");
                expect(results.status).toBe(401);
            });

            it('it should display you shall not pass', async()=> {
                const text = {you: "shall not pass!"};
                const results = await request(server).get("/api/jokes");

                expect(results.body).toEqual(text);
                
            });

            
        });

       
    });
