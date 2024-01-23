const Job = require("../models/Job")


// get all jobs 
const getAllJobs = async (req, res)=>{
    try {
        const jobsData = await Job.find()
        res.status(200).json({
            status:true,
            data: jobsData
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

// get a job with id
const getSingleJob = async(req,res) =>{
    try {
        const job = await Job.findOne({_id: req.params.id})
        res.status(200).json({
            status:true,
            message:"get single job successfully",
            data: job
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

module.exports = {getAllJobs, getSingleJob}