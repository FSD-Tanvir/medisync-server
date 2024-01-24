const User = require("../models/User")



// get all user 
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const postUser = async(req, res)=>{
    try{
      const userData = req.body ;
      const newUser = new User(userData)
      const savedUser = await newUser.save()
      res.json(savedUser)
    }
    catch(err){
      console.log(err)
    }
  }

  module.exports = {
    getAllUsers, postUser 
}