const Job = require("../models/job");

// get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobsData = await Job.find();
    res.status(200).json({
      status: true,
      data: jobsData,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// get a job with id
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "get single job successfully",
      data: job,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// post a new job
const postSingleJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({
      status: true,
      message: "jobs data inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// update single job
const updateSingleJob = async (req, res) => {
  try {
    const updatedJob = req.body;
    await Job.updateOne({ _id: req.params.id }, { $set: { ...updatedJob } });
    res.status(200).json({
      status: true,
      message: "Job data updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// delete job
const deleteJob = async (req, res) => {
  try {
    await Job.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Job deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllJobs,
  getSingleJob,
  postSingleJob,
  updateSingleJob,
  deleteJob,
};
