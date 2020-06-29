const express = require('express')

const VendorCtrl = require('../controllers/vendor.controller')
const router = express.Router()

router.post('/vendor', VendorCtrl.createVendor)
router.get('/vendors/:id', VendorCtrl.getAllVendors)
router.get('/vendor/:id', VendorCtrl.getVendorById)
router.delete('/vendor/:id', VendorCtrl.deleteVendorById)
router.put('/vendor/:id', VendorCtrl.updateVendorById)

module.exports = router
