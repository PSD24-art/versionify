const express = require("express");
const issueRouter = express.Router();

const {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
} = require("../controller/issueController");

issueRouter
  .route("/:id")
  .get(getIssueById)
  .put(updateIssueById)
  .delete(deleteIssueById);

issueRouter.post("/new", createIssue);
issueRouter.get("/all", getAllIssues);

module.exports = issueRouter;
