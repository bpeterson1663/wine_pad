const express = require('express')
const UserCtrl = require('../controllers/user.controller')
const router = express.Router()
const passport = require('passport')

router.post('/register', UserCtrl.createUser)
router.post('/authenticate', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err
    if (!user) res.send('No User Exists')
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send('Successfully Authenticated')
      })
    }
  })(req, res, next)
})

router.get('/user', (req, res) => {
  res.send(req.user)
})

module.exports = router
