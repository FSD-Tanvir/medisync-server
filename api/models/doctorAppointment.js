const mongoose = require("mongoose")
const {Schema} = mongoose

const doctorAppointmentSchema = new Schema({
    date:{
        type: Date,
        required:true,
    },
    timeSlot:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:Number,
        minlength:11,
        maxlength:14,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    doctorId:{
        type:String,
        required:true,
    },
    paidStatus:{
        type:Boolean,
        default:false,
    },
    transactionId:{
        type:String,
        required:true,
    },
    meetingLinks:{
        type:String,
        default:''
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    totalAppointments:{
        type: Number,
        default:0
    },
    applicationDate: {
        type:Date,
        default:Date.now
    },

})

const DoctorAppointment =  mongoose.model("DoctorAppointment", doctorAppointmentSchema)

module.exports = DoctorAppointment