const User = require('../models/User')

const createUser = (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
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
