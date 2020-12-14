const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../users/users-model');
const { checkPayload, checkUsernameExists, checkUsernameUnique } = require('../../api/middlewares/auth-middlewares');
const router = express.Router();

router.post('/register', checkPayload, checkUsernameUnique, async (req, res) => {
    console.log('registering')
    try {
        const hash = bcrypt.hashSync(req.body.password, 10)
        const newUser = await User.addUser({ username: req.body.username, password: hash })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/login', checkPayload, checkUsernameExists, async (req, res) => {
    console.log('logging in')
    try {
        const verifies = bcrypt.compareSync(req.body.password, req.userData.password)
        if (verifies) {
            res.session.user = req.userData
            res.json(`Welcome back, ${req.userData.username}`)
        } else {
            res.status(401).json('You shall not pass!')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/logout', (req, res) => {
    console.log('goodbye for now')
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.json('You cannont leave')
            } else {
                res.json('Goodbye!')
            }
        })
    } else {
        res.status(500).json('There was never a session')
    }
})

module.exports = router;