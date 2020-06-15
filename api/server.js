const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    name: 'logginSession', 
    secret: 'What do you mean?',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false, //true in production
      httpOnly: true, 
    }, 
    resave: false,
    saveUninitialized: false,
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (res, req) => {
    res.status(200).json({API: "API is now up and running"});
});

module.exports = server;
