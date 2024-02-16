const User = require("../models/User")
// get all user
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({
        status: true,
        message: "New user created successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  };
  const makeAdmin = async (req, res) => {
    try {
        const result= await User.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                role: "admin"
            }
        }, {
            new: true
        })
        res.status(200).json({
            status: true,
            message: "New user created successfully",
            data: result,
          });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
  }

module.exports = { getAllUsers, makeAdmin };