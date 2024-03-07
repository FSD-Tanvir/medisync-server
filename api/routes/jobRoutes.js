const express = require("express");
const {
  getAllJobs,
  getSingleJob,
  postSingleJob,
  updateSingleJob,
  deleteJob,
} = require("../controllers/jobController");
const router = express.Router();

// get all jobs router
router.get("/", getAllJobs);
// get single job router
router.get("/single/:id", getSingleJob);

// post many jobs router
router.post("/add-job", postSingleJob);

// update single job
router.put("/update-job/:id", updateSingleJob);
// delete single job
router.delete("/delete-job/:id", deleteJob);

module.exports = router;
