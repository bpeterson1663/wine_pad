const express = require('express')

const WineCtrl = require('../controllers/wine.controller')
const router = express.Router()
const authorized = require('../middleware/middleware')

router.post('/wine', authorized, WineCtrl.createWine)
router.get('/wines/:id', authorized, WineCtrl.getAllWines)
router.get('/winesByPar/:id', authorized, WineCtrl.getWinesByPar)
router.get('/wine/:id', authorized, WineCtrl.getWineById)
router.delete('/wine/:id', authorized, WineCtrl.deleteWineById)
router.put('/wine/:id', authorized, WineCtrl.updateWineById)
module.exports = router
