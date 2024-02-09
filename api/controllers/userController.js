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

// create new user
const postUser = async (req, res) => {
  try {
    const userEmail = req.params?.email;

    const userData = req.body;
    const user = await User.findOne({ email: userEmail });
    if (user) {
      return res.json({ status: false, message: "You are already registered" });
    }
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    res.status(200).json({
      status: true,
      message: "New user created successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
// check the of role of user - if they are admin or normal user
const checkRole = async (req, res) => {
  try {
    const userEmail = req.params?.email;
    const user = await User.findOne({ email: userEmail });
    let role;
    if (user) {
      role = user?.role === "user" ? "user" : "admin";
    }
    res.status(200).json({
      status: true,
      message: "Successfully got the role",
      role: role,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// delete many
// const deleteAllUsers = async(req, res)=>{
//   try{
//     await User.deleteMany({})
//     res.status(200).json({
//       status: true,
//       message: "All user deleted successfully"
//     });
//   }
//   catch(err){
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// }

module.exports = {
  getAllUsers,
  postUser,
  checkRole,
};
