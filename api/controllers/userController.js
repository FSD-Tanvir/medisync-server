const User = require("../models/User");
const UserStatistic = require("../models/userStatistics");

// function for update UserStatistics collection
const  updateUserStatistics = async() =>{
  const totalUsers = await User.countDocuments();
  const userStatistic = new UserStatistic({totalUsers})
  await userStatistic.save();
}

// get all user
const getAllUsers = async (req, res) => {
  try {
    let startDate, endDate;

    switch (req.query.filter) {
      case "all_day":
        startDate = new Date(1900,0,1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        break;
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        endDate.setHours(23,59,59,999)
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
        endDate.setHours(23,59,59,999)
    }
    const query = {}
    if (req.query.filter) {
      const userStatistics = await UserStatistic.find({date: {$gte:startDate, $lte:endDate}}).sort({date:1})
      // console.log(userStatistics);
      // get initial total users 
      const initialTotalUsers = userStatistics.length > 0 ? userStatistics[0].totalUsers : 0;
      // get final total users 
      const finalTotalUsers = userStatistics.length > 0 ? userStatistics[userStatistics.length - 1].totalUsers : 0;
      // get is increased or decreased
      const increase = finalTotalUsers - initialTotalUsers;
      const decrease = initialTotalUsers - finalTotalUsers;

      // get is percentage increased or decreased
      const percentageIncrease = (increase === 0 && initialTotalUsers === 0) ?  (0 * 100).toFixed(2): ((increase/initialTotalUsers) * 100).toFixed(2)
      const percentageDecrease = (decrease === 0 && initialTotalUsers === 0) ? (0 * 100).toFixed(2): ((decrease/initialTotalUsers) * 100).toFixed(2)

      // console.log(users);
      return res.status(200).json({
        message:true,
        increase,
        decrease,
        percentageIncrease,
        percentageDecrease,
        userStatistics
      })
    }
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
// get single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params?.email });
    res.status(200).json({
      status: true,
      message: "Single user gotten successfully",
      data: user,
    });
  } catch (err) {
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
    // update user statistics
    await updateUserStatistics()

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

// update user
const updateUser = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const acknowledgement = await User.updateOne(
      { email: userEmail },
      { $set: { ...req.body } }
    );
    res.status(201).json({
      status: true,
      message: "Profile updated successfully",
      acknowledgement,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// check the of role of user - if they are admin or normal user
// const checkRole = async (req, res) => {
//   try {
//     const userEmail = req.params?.email;
//     const user = await User.findOne({ email: userEmail });
//     let role;
//     if (user) {
//       role = user?.role === "user" ? "user" : "admin";
//     }
//     res.status(200).json({
//       status: true,
//       message: "Successfully got the role",
//       role: role,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };

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
  updateUser,
  getSingleUser,
};
