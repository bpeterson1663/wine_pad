const User = require('../models/User')

const createUser = (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then(() => {
      req.logIn(user, (err) => {
        if (err) return res.status(401).json({ success: false, error: err })
        return res.status(201).json({ userId: user._id, success: true, message: 'Successfully Authenticated' })
      })
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
      })
    })
}

module.exports = {
  createUser,
}
