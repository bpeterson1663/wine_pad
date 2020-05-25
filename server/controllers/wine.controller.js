const Wine = require('../models/Wine')

const createWine = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: 'Error: Wine data was not provided',
    })
  }

  const wine = new Wine(req.body)
  wine
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: wine._id,
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
  createWine,
}
