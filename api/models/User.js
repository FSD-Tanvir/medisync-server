const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema model
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    minlength: 3,
    required: true,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default:"user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create a model instance
const User = mongoose.model("User", userSchema);

module.exports = User;
