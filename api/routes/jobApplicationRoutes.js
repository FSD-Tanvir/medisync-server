const express = require("express")
const { saveJobApplication } = require("../controllers/jobApplicationController")
const router = express.Router()

router.post("/save-application",saveJobApplication)

module.exports = router;