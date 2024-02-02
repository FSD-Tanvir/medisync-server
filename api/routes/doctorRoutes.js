const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')

// get all doctors item

router.get('/',doctorController.getAllDoctors)
router.post('/',doctorController.postDoctor)


module.exports = router;