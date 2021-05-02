const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Wine = new Schema(
  {
    name: { type: String, required: true },
    varietal: { type: String },
    region: { type: String },
    vintage: { type: String },
    appellation: { type: String },
    price: { type: Number },
    cost: { type: Number },
    inventory: { type: Number },
    par: { type: Number },
    description: { type: String },
    cellarId: { type: String },
    vendorId: { type: String },
    winery: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model('wines', Wine)
