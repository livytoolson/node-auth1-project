const db = require('../../data/dbConfig');

module.exports = {
    getAllUsers,
    addUser,
    findBy,
    findById
}

function getAllUsers() {
    return db('users').select("id", "username").orderBy('id');
}

function addUser(user) {
    const [id] = db('users').insert(user, 'id');
    return findById(id)
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id');
}

function findById(id) {
    return db('users').where({ id }).first()
}