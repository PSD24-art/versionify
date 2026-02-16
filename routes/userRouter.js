const express = require("express");

const {
  getAllUser,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/allUsers", getAllUser);

userRouter
  .route("/user/profile")
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile);

module.exports = userRouter;
