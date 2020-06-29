const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const db = require('./db')
const wineRouter = require('./routes/wine.router')
const userRouter = require('./routes/user.router')
const vendorRouter = require('./routes/vendor.router')

const PORT = 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', wineRouter)
app.use('/api', userRouter)
app.use('/api', vendorRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
