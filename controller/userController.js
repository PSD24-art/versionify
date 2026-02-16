const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signup = (req, res) => {
  const { username, password, email } = req.body;
  try {
  } catch (e) {
    console.log("Error signing up..", e);
  }
  res.send("Signing up");
};

exports.login = (req, res) => {
  res.send("Logging up");
};

exports.getAllUser = (req, res) => {
  res.send("fetched all users");
};

exports.getUserProfile = (req, res) => {
  res.send("User profile fetched");
};

exports.updateUserProfile = (req, res) => {
  res.send("User profile updated");
};

exports.deleteUserProfile = (req, res) => {
  res.send("User profile deleted");
};
