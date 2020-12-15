const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('session');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const config = require('./cookieConfig');

const server = express();

server.use(cors());
server.use(helmet());
server.use(session(config));
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ api: `Welcome to Node Auth1 API` })
});

module.exports = server;