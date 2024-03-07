const express = require("express")
const { saveAppointment, getAllAppointments, updateAppointment,deleteAppointment,callBack,redirectToUri } = require("../controllers/doctorAppointmentController")
const router = express.Router()

router.post("/save-appointment/:id", saveAppointment)
router.get("/all", getAllAppointments)
router.post("/payment/success/:tran_id", updateAppointment)
router.post("/payment/failed/:tran_id", deleteAppointment)
router.post("/payment/canceled/:tran_id", deleteAppointment)
router.put("/update-booked-appointment/:tran_id", updateAppointment)


module.exports = router;