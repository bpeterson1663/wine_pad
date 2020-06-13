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

const getAllWines = (req, res) => {
  Wine.find({ cellarId: req.params.id }, (err, items) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, items: items })
  })
}

const getWineById = (req, res) => {
  Wine.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, item: item })
  }).catch((err) => console.error(err))
}

const updateWineById = (req, res) => {
  Wine.updateOne({ _id: req.params.id }, req.body, (err, item) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      })
    }
    return res.status(200).json({
      success: true,
      id: item._id,
    })
  })
}

const deleteWineById = (req, res) => {
  Wine.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ suceess: true, item: item })
  }).catch((error) => console.error(error))
}
module.exports = {
  createWine,
  getAllWines,
  getWineById,
  deleteWineById,
  updateWineById,
}
