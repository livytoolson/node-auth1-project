const db = require('../../data/dbConfig');

module.exports = {
    getAllUsers,
    add,
    findBy,
    findById
}

function getAllUsers() {
    return db('users').select("id", "username").orderBy('id');
}

function add(user) {
    return db('users')
    .insert(user)
    .then((id) => {
        return db('users').where({ id }).first()
    })
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id');
}

function findById(id) {
    return db('users').where({ id }).first()
}