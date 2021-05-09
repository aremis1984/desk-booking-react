const express = require('express')

const DesksCtrl = require('../controllers/desks-controller')

const router = express.Router()

router.post('/desk', DesksCtrl.createDesk)
router.put('/desk/:id', DesksCtrl.updateDesk)
router.delete('/desk/:id', DesksCtrl.deleteDesk)
router.get('/desks', DesksCtrl.getDesks)

module.exports = router
