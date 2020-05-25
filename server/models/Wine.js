const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Wine = new Schema(
  {
    name: { type: String, required: true },
    varietal: { type: String },
    region: { type: String },
    vintage: { type: String },
    appelation: { type: String },
    price: { type: Number },
    cost: { type: Number },
    tastingNotes: { type: String },
    cellarId: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model('wines', Wine)
