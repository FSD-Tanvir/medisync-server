const mongoose = require("mongoose")
const {Schema} = mongoose;

const userStatisticSchema = new Schema({
    date:{
        type:Date,
        default:Date.now
    },
    totalUsers: Number,
})

const UserStatistic = mongoose.model("UserStatistic", userStatisticSchema);

module.exports = UserStatistic;

