const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secret = 'secret'

const createUser = (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
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

const authenticateUser = (req, res) => {
    const { email, password} = req.body
    User.findOne( {email}, (err, userFound) => {
        if (err) {
            return res.status(500).json({success: false, error: err})
        } else if(!userFound){
            return res.status(401)
                .json({success: false, error: 'Incorrect email or password'})
        } else {
            const user = new User({email: userFound.email, password: userFound.password})
            user.isCorrectPassword(password, (err, same) => {
                if(err){
                    return res.status(500)
                        .json({success: false, error: err})
                } else if (!same) {
                    return res.status(401)
                        .json({success: false, error: 'Incorrect email or password'})
                }else {
                    const payload = { email }
                    const token = jwt.sign(payload, secret, {expiresIn: '1h'})
                    return res.cookie('token', token, { httpOnly: true})
                        .status(200)
                }
            })
        }
    })
}

module.exports = {
    createUser,
    authenticateUser
}

