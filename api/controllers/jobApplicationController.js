const JobApplication = require("../models/JobApplication");

const saveJobApplication = async(req,res) =>{
    try {
        const application = req.body;
        console.log(req.body?.jobName)
        // checking - if already applied or not 
        const isAlreadyApplied = await JobApplication.findOne({email:req.body?.email,jobName:req.body?.jobName})
        if(isAlreadyApplied){return res.status(403).json({status:false,message:"Already applied this job"})}
        // now save application on database 
        const newJobApplication = new JobApplication({...application})
        const acknowledge = await newJobApplication.save()
        res.status(201).json({
            status:true,
            message:"Application saved successfully",
            acknowledge,
        })
    } catch (err) {
        res.status(500).json({
            status:false,
            message: err.message,
        })
    }
}

module.exports = {
    saveJobApplication,
}