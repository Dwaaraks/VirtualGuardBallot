const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adharcard: {
    type: String,
  },
  voteridcard: {
    type: String,
  },
  showadhar: {
    type: Boolean,
    default: false,
  },
  showvoterid: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
