const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    const hassPassword = await bcrypt.hash(password, 10);
    // Save user
    const user = new userModel({ username, email, password: hassPassword });
    await user.save();

    return res.status(200).send({
      success: true,
      message: "User has been created",
      user,
    });
  } catch (err) {
    console.log(`Error is ${err}`);
    return res.status(500).send({
      message: "Error in Register Callback",
      success: false,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all User Data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.send(500).send({
      success: false,
      message: "Error in Get All Field",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).send({
      success: false,
      message: "Error in Login Callback",
    });
  }
};
