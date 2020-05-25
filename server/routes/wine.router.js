const express = require('express')

const WineCtrl = require('../controllers/wine.controller')
const router = express.Router()

router.post('/wine', WineCtrl.createWine)
router.get('/wines/:id', WineCtrl.getAllWines)
module.exports = router
