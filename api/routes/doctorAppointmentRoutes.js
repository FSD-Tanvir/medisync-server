const express = require("express")
const { saveAppointment, getAllAppointments } = require("../controllers/doctorAppointmentController")
const router = express.Router()

router.post("/save-appointment/:id", saveAppointment)
router.get("/all", getAllAppointments)

module.exports = router;