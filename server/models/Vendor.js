const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Vendor = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  cellarId: { type: String },
  notes: { type: String },
})

module.exports = mongoose.model('vendors', Vendor)
