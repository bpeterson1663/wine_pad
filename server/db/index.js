const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectionString = process.env.DB_URI

mongoose
  .connect(connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => console.error('Connection error: ', e.message))

const db = mongoose.connection

module.exports = db
