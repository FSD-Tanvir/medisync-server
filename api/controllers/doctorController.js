const Doctor = require("../models/doctor");

const getAllDoctors = async (req, res) => {
  try {

    
     const search = req.query?.search || ""

    // console.log("query",query)
    const doctors = await Doctor.find({name: {$regex: search, $options:"i"}});
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get single doctor data 
const getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({_id:req.params.id});
    res.status(200).json({
      status: true,
      message: "single Doctor data gotten successfully",
      data: doctor,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
// post doctor
const postDoctor = async (req, res) => {
  const doctor = req.body;
  try {
    const result = await Doctor.create(doctor);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update doctor
const updateDoctor = async (req, res) => {
  try {
    const doctor = req.body;
    const result = await Doctor.updateOne(
      { _id: req.params.id },
      { $set: { ...doctor } }
    );
    res.status(201).json({
      status: true,
      message: "Doctor data updated successfully",
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
// delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const result = await Doctor.deleteOne({_id: req.params.id})
    res.status(200).json({
      status: true,
      message: "Doctor deleted successfully",
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllDoctors,
  getSingleDoctor,
  postDoctor,
  deleteDoctor,
  updateDoctor
};
