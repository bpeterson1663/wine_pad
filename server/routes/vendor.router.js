const express = require('express')

const VendorCtrl = require('../controllers/vendor.controller')
const router = express.Router()
const authorized = require('../middleware/middleware')

router.post('/vendor', authorized, VendorCtrl.createVendor)
router.get('/vendors/:id', authorized, VendorCtrl.getAllVendors)
router.get('/vendor/:id', authorized, VendorCtrl.getVendorById)
router.delete('/vendor/:id', authorized, VendorCtrl.deleteVendorById)
router.put('/vendor/:id', authorized, VendorCtrl.updateVendorById)

module.exports = router
