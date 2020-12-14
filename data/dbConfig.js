const knex = require('knex');

const knexfile = require('../knexfile');

// const db = knex(
//     process.env.NODE_ENV === 'production'
//     ? config.production
//     : config.development
// );

const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexfile[environment]);