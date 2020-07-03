const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./db')
const wineRouter = require('./routes/wine.router')
const userRouter = require('./routes/user.router')
const vendorRouter = require('./routes/vendor.router')
const passportConfig = require('./middleware/passport-config')
const PORT = 4000

const SECRET = process.env.SECRET
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  }),
)
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)
app.use(cookieParser(SECRET))
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', wineRouter)
app.use('/api', userRouter)
app.use('/api', vendorRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
