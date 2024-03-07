const express = require("express");
const app = express();
require("dotenv").config();
const { ObjectId } = require("mongoose").Types;
const axios = require("axios");
const cors = require("cors");

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "teamp65d7090b9e99f";
const store_passwd = "teamp65d7090b9e99f@ssl";
const is_live = false; //true for live, false for sandbox

const User = require("../models/User");
const DoctorAppointment = require("../models/doctorAppointment");

// function for update totalAppointments filed on appointment saved or delete
const updateTotalAppointmentStatistics = async (id) => {
  const totalAppointments = await DoctorAppointment.countDocuments();
  await DoctorAppointment.updateOne(
    { _id: id },
    { $set: { totalAppointments } }
  );
};

// get all appointments
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
        appointmentStatistics.length > 0
          ? appointmentStatistics[0].totalAppointments
          : 0;
      const finalTotalAppointments =
        appointmentStatistics.length > 0
          ? appointmentStatistics[appointmentStatistics.length - 1]
              .totalAppointments
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
  const tran_id = new ObjectId().toString();
  const orderInfo = req.body;

  try {
    const isExist = await DoctorAppointment.findOne({
      user: req.params.id,
      timeSlot: req.body?.timeSlot,
      date: req.body?.date,
    });
    if (isExist) {
      return res.status(403).json({
        status: false,
        message: "You have already booked this slot and date",
        data: isExist,
      });
    }
    const data = {
      total_amount: 150,
      currency: orderInfo?.currency,
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `https://medisync-server.vercel.app/doctorAppointments/payment/success/${tran_id}`,
      fail_url: `https://medisync-server.vercel.app/doctorAppointments/payment/failed/${tran_id}`,
      cancel_url: `https://medisync-server.vercel.app/doctorAppointments/payment/canceled/${tran_id}?cancel=${true}`,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Email",
      product_name: "Appointment",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: orderInfo?.userEmail,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: orderInfo?.mobileNumber,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    // (data)
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(async (apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;

      // save appointment on database
      const newDoctorAppointment = new DoctorAppointment({
        ...req.body,
        user: req.params.id,
        transactionId: tran_id,
      });

      const appointment = await newDoctorAppointment.save();

      // update totalAppointments field
      await updateTotalAppointmentStatistics(appointment?._id);

      // push appointment id on the user appointments field
      await User.updateOne(
        { _id: req.params.id },
        {
          $push: {
            appointments: appointment?._id,
          },
        }
      );
      if (appointment) {
        res.send({ url: GatewayPageURL });
      }

      // ("Redirecting to: ", GatewayPageURL);
    });
  } catch (err) {
    ("Error initiating payment", err);
    res.status(500).json({
      status: false,
      message: "Error initiating payment",
    });
  }
};

// update appointment paidStatus field after successfully payment
const updateAppointment = async (req, res) => {
  try {
    if (req.query.meetLinkUpdated) {
      ("back-end")
      ("meetingLinks",req.body.meetingLinks)
      const appointment = await DoctorAppointment.updateOne(
        { transactionId: req.params.tran_id },
        { $set: { meetingLinks: req.body.meetingLinks } },
        { new: true }
      );
      return res
        .status(201)
        .json({
          status: true,
          message: "Appointment updated successfully",
          appointment,
        });
    }

    const appointment = await DoctorAppointment.updateOne(
      { transactionId: req.params.tran_id },
      { $set: { paidStatus: true } }
    );

    if (appointment.modifiedCount > 0) {
      res.redirect(
        `https://cosmic-stroopwafel-b283d3.netlify.app/payment/success/${req.params.tran_id}`
      );
    }
    // (appointment);
  } catch (err) {
    ("Error initiating payment", err);
    res.status(500).json({
      status: false,
      message: "Error initiating payment",
    });
  }
};
// delete appointment if payment canceled or failed
const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await DoctorAppointment.findOneAndDelete({
      transactionId: req.params.tran_id,
    });

    if (!deletedAppointment) {
      return res.status(404).json({
        status: false,
        message: "Appointment not found",
      });
    }

    // remove appointment Id from user "appointments field" - after her appointment is deleted
    await User.updateOne(
      { _id: deletedAppointment.user },
      { $pull: { appointments: deletedAppointment._id } }
    );

    // checking - is order canceled - redirect to cancel page if payment failed
    if (req.query.cancel) {
      res.redirect(`https://cosmic-stroopwafel-b283d3.netlify.app/payment/canceled`);
    }
    // handle redirect to fail page if payment failed
    else {
      res.redirect(`https://cosmic-stroopwafel-b283d3.netlify.app/payment/failed`);
    }
    // (result)
  } catch (err) {
    ("Error initiating payment", err);
    res.status(500).json({
      status: false,
      message: "Error initiating payment",
    });
  }
};

module.exports = {
  saveAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
};
