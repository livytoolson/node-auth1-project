const router = require('express').Router();
const Users = require('./users-model');

router.get('/', (req, res) => {
    Users.getAllUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
});

module.exports = router;