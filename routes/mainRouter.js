const express = require("express");
const userRouter = require("./userRouter");
const repoRouter = require("./repoRouter");
const issueRouter = require("./issueRouter");
const mainRouter = express.Router();

mainRouter.use("/repo", repoRouter);
mainRouter.use("/issue", issueRouter);
mainRouter.use(userRouter);
mainRouter.get("/", (req, res) => {
  res.send("Hello users");
});

module.exports = mainRouter;
