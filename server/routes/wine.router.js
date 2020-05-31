const express = require('express')

const WineCtrl = require('../controllers/wine.controller')
const router = express.Router()

router.post('/wine', WineCtrl.createWine)
router.get('/wines/:id', WineCtrl.getAllWines)
router.get('/wine/:id', WineCtrl.getWineById)
router.delete('/wine/:id', WineCtrl.deleteWineById)
router.put('/wine/:id', WineCtrl.updateWineById)
module.exports = router
