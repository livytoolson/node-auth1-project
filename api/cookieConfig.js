const session = require('express-session');

const KnexSessionStore = require('connect-session-knex')(session);

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

module.exports = config;