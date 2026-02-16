const express = require("express");

const {
  createRepo,
  updateRepoById,
  deleteRepoById,
  getRepoById,
  getRepoForCurrentUser,
  getRepoByName,
  vivbilityToggleById,
  getAllRepos,
} = require("../controller/repoController");

const repoRouter = express.Router();

repoRouter.post("/new", createRepo);
repoRouter
  .route("/:id")
  .get(getRepoById)
  .put(updateRepoById)
  .delete(deleteRepoById);
repoRouter.get("/all", getAllRepos);
repoRouter.get("/user/:id", getRepoForCurrentUser);
repoRouter.get("/:name", getRepoByName);
repoRouter.patch("/toggle/:id", vivbilityToggleById);

module.exports = repoRouter;
