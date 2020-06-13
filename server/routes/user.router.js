const express = require('express')
const UserCtrl = require('../controllers/user.controller')
const router = express.Router()
const withAuth = require('../middleware')

router.post('/user',  UserCtrl.createUser)
router.post('/authenticateUser', UserCtrl.authenticateUser)

router.get('/checkToken', withAuth, (req, res) => {
    res.sendStatus(200)
})

module.exports = router