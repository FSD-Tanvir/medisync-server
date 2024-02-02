const Doctor = require('../models/Doctor')

const getAllDoctors = async(req,res)=>{
    try {
        const doctors = await Doctor.find({})
        res.status(200).json(doctors)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const postDoctor = async (req, res) => {
    const doctor = req.body
    try {
        const result = await Doctor.create(doctor)
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllDoctors , postDoctor
}