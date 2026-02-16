const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  checkExistingUser,
  feedUser,
  getAllUsers,
  getUserById,
} = require("../models/user.queries");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await checkExistingUser(email);
    if (user) {
      console.log(user);
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = await feedUser(username, email, hashedPassword);
    console.log(response);

    const token = jwt.sign({ id: username }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.json({ token });
  } catch (e) {
    console.error("Error signing up..", e);
    res.status(500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await checkExistingUser(email);
  console.log(user);
  if (!user) {
    res.status(500).json({ message: "Invalid credentials 1" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(500).json({ message: "Invalid credentials 2" });
  }

  const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1hr",
  });

  res.json({ token, id: user.id, name: user.username, email: user.email });

  try {
  } catch (e) {
    console.log("Error Logging in..", e);
    res.status(500);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (!users[0]) {
      res.status(500).json({ message: "No existing users" });
    }

    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error getting users" });
  }
};

exports.getUserProfile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await getUserById(id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user, message: "Profile fetched" });
  } catch (e) {
    console.log("Failed to fetch user profile", e);
  }
};

exports.updateUserProfile = (req, res) => {
  res.send("User profile updated [HOLD]");
};

exports.deleteUserProfile = (req, res) => {
  res.send("User profile deleted [HOLD]");
};
