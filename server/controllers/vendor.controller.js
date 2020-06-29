const Vendor = require('../models/Vendor')

const createVendor = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: 'Error: Vendor data was not provided',
    })
  }

  const vendor = Vendor(req.body)
  vendor
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: vendor._id,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
      })
    })
}

const getAllVendors = (req, res) => {
  Vendor.find({ cellarId: req.params.id }, (err, items) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, items })
  })
}

const getVendorById = (req, res) => {
  Vendor.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(201).json({ success: true, item })
  }).catch((err) => console.error(err))
}

const updateVendorById = (req, res) => {
  Vendor.updateOne({ _id: req.params.id }, req.body, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({
      success: true,
      id: item._id,
    })
  })
}

const deleteVendorById = (req, res) => {
  Vendor.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(201).json({ success: true, item })
  }).catch((err) => console.error(err))
}
module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendorById,
  deleteVendorById,
}
