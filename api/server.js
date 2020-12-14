const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const KnexSessionStore = require('connect-session-knex')(session)

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

const config = {
    name: 'banana',
    secret: 'Keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require('../data/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    })
};

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