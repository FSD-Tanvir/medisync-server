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
    doctorId:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    applicationDate: {
        type:Date,
        default:Date.now
    },
    totalAppointments:{
        type: Number,
        default:0
    }

})
// middleware to update totalAppointments fields when new appointment saved 
// doctorAppointmentSchema.post("save", async()=>{
//     const totalAppointments = await this.model("DoctorAppointment").countDocuments();
//     await this.model("DoctorAppointment").updateOne({}, {$set:{totalAppointments}})
// })
// middleware to update totalAppointments fields when an appointment deleted
// doctorAppointmentSchema.post("deleteOne", async()=>{
//     const totalAppointments = await this.model("DoctorAppointment").countDocuments();
//     await this.model("DoctorAppointment").updateOne({},{$set:{totalAppointments}})
// }) 

const DoctorAppointment =  mongoose.model("DoctorAppointment", doctorAppointmentSchema)

module.exports = DoctorAppointment