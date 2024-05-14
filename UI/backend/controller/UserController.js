const Usermodel = require("../models/Usermodel.js");

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await Usermodel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }

    //save new user
    const user = new Usermodel({ username, email, password });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password

    if (password != user.password) {
      return res.status(401).send({
        success: false,
        message: "Invlaid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};

exports.getAllusers = async (req, res) => {
  try {
    const users = await Usermodel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await Usermodel.findById(id);
    if (!user) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.adhar = async (req, res) => {
  try {
    const { id, adharcard } = req.body;
    const user = await Usermodel.findByIdAndUpdate(id, {
      adharcard: adharcard,
    });
    if (!user) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.voter = async (req, res) => {
  try {
    const { id, voteridcard } = req.body;
    const user = await Usermodel.findByIdAndUpdate(id, {
      voteridcard: voteridcard,
    });
    if (!user) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.showAdhar = async (req, res) => {
  try {
    const { id, value } = req.body;
    const user = await Usermodel.findByIdAndUpdate(id, {
      showadhar: value,
    });
    return res.status(200).send({
      message: "Success",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.showVoterID = async (req, res) => {
  try {
    const { id, value } = req.body;
    const user = await Usermodel.findByIdAndUpdate(id, {
      showvoterid: value,
    });
    return res.status(200).send({
      message: "Success",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};
