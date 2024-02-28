const User = require("../models/User");
const DoctorAppointment = require("../models/doctorAppointment");

// function for update totalAppointments filed on appointment saved or delete 
const updateTotalAppointmentStatistics = async(id) =>{
  const totalAppointments = await DoctorAppointment.countDocuments();
  await DoctorAppointment.updateOne({_id:id},{$set:{totalAppointments}})
}


// save appointment
const getAllAppointments = async (req, res) => {
  
 try {
  let startDate, endDate;
  switch (req.query.filter) {
    case "all_day":
      startDate = new Date(1900, 0, 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      break;
    case "today":
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    case "week":
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      break;
    case "month":
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      break;
    case "year":
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setMonth(0);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      break;
    default:
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
  }
 
    if (req.query.filter) {
      const appointmentStatistics = await DoctorAppointment.find({
        applicationDate: { $gte: startDate, $lte: endDate },
      }).sort({ applicationDate: 1 });
      // get initial total appointments
      const initialTotalAppointments =
      appointmentStatistics.length > 0 ? appointmentStatistics[0].totalAppointments : 0;
      const finalTotalAppointments =
      appointmentStatistics.length > 0
          ? appointmentStatistics[appointmentStatistics.length - 1].totalAppointments
          : 0;
      // get increase & decrease
      const increase = finalTotalAppointments - initialTotalAppointments;
      const decrease = initialTotalAppointments - finalTotalAppointments;
      // get percentage is increased & decreased
      const percentageIncrease =
        increase >= 0 && initialTotalAppointments > 0
          ? ((increase / initialTotalAppointments) * 100).toFixed(2)
          : 0;
      const percentageDecrease =
        decrease >= 0 && initialTotalAppointments > 0
          ? ((increase / initialTotalAppointments) * 100).toFixed(2)
          : 0;

      return res.status(200).json({
        status: true,
        message: "Appointments statistics gotten successfully",
        increase,
        decrease,
        percentageIncrease,
        percentageDecrease,
        appointmentStatistics,
      });
    }
    const appointments = await DoctorAppointment.find();

    res.status(200).json({
      status: true,
      message: "All appointments gotten successfully",
      appointments,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// save appointment
const saveAppointment = async (req, res) => {
  try {
    const isExist = await DoctorAppointment.findOne({
      user: req.params.id,
      timeSlot: req.body?.timeSlot,
      date: req.body?.date,
    });
    if (isExist) {
      return res
        .status(403)
        .json({
          status: false,
          message: "You have already booked this slot and date",
          data: isExist,
        });
    }

    // const receivedDate = new Date(req.body.date);
    // const utcDate = receivedDate.toISOString();

    // date:utcDate

    const newDoctorAppointment = new DoctorAppointment({
      ...req.body,
      user: req.params.id,
    });

    const appointment = await newDoctorAppointment.save();

    // update totalAppointments field 
    await updateTotalAppointmentStatistics(appointment?._id)

    // push appointment id on the user appointments field 
    await User.updateOne(
      { _id: req.params.id },
      {
        $push: {
          appointments: appointment?._id,
        },
      }
    );

    res.status(201).json({
      status: true,
      message: "Appointment saved successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err,
    });
  }
};

module.exports = {
  saveAppointment,
  getAllAppointments,
};
