const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema model
const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  vacancy: {
    type: Number,
    required: true,
  },
  compensationAndBenefits: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobContext: {
    type: String,
    required: true,
  },
  jobResponsibilities: {
    type: [String],
    required: true
  },
  educationalRequirements: {
    type: String,
    required: true,
  },
  experienceRequirements: {
    type: String,
    required: true,
  },
  additionalRequirements: {
    type: String,
    required: true,
  },
  workplace: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postAt: {
    type: Date,
    default: Date.now,
  },
});

// create a model instance
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
