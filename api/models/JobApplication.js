const mongoose = require("mongoose")
const {Schema} = mongoose;

const jobApplicationSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    jobName:{
        type:String,
        required:true,
    },
    jobId:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        minlength:3,
        required:true,
    },
    phoneNumber:{
        type:String,
        minlength:11,
        maxlength:15,
        required:true,
    },
    education:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        minlength:2,
        required:true,
    },
    expectedSalary:{
        type:String,
        required:true
    },
    cv:{
        type:String,
        required:true,
    },    
    appliedDate: {
        type:Date,
        default:Date.now
    }
})

const JobApplication = mongoose.model("jobApplication",jobApplicationSchema)

module.exports = JobApplication;