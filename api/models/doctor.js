const mongoose = require('mongoose');
const { Schema } = mongoose;

// create schema object for doctor
const doctorSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    specialization: String,
    image: String,
    qualification: String,
    experience_years: Number,
    contact: {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true, 
        },
        phone: String,
    },
    university: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
