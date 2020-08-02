const express = require('express')
const UserCtrl = require('../controllers/user.controller')
const router = express.Router()
const passport = require('passport')

router.post('/register', UserCtrl.createUser)
router.post('/authenticate', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(401).json({ success: false, error: err })
    else {
      req.logIn(user, (err) => {
        if (err) return res.status(401).json({ success: false, error: err })
        res.status(201).json({userId: user.id, success: true, message: 'Successfully Logged In' })
      })
    }
  })(req, res, next)
})
router.get('/logout', function (req, res) {
  req.logout()
  res.status(201).json({ success: true, message: 'Logged Out Successful' })
})
router.get('/user', (req, res) => {
  res.send(req.user)
})

module.exports = router
