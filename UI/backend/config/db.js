const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dwaarakesh2002:Dwaarakesh123@cluster0.a2rvk4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected");
  } catch (error) {
    console.log("Error");
  }
};

module.exports = connectDB;
