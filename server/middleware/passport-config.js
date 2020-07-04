const User = require('../models/User')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err, false)
        if (!user) return done('Email does not exist', false)
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err
          if (result === true) {
            return done(null, user)
          } else {
            return done('Your password is incorrect', false)
          }
        })
      })
    }),
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      if (err) {
        done(null, false, { error: err })
      } else {
        const userInformation = {
          _id: user._id,
          email: user.email,
        }
        done(null, userInformation)
      }
    })
  })
}
