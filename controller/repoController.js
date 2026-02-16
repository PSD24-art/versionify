const { creaeRepo, createRepo } = require("../models/repos.queries");

exports.createRepo = async (req, res) => {
  const { userId, name, description, visibility } = req.body;

  try {
    if (!userId || !name) {
      return res.status(400).json({ error: "User id or Name is required" });
    }

    const newRepo = await createRepo(userId, name, description, visibility);
    console.log(newRepo);
    res.json({ message: "Repo saved Successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to create repository", e });
  }
};

exports.getAllRepos = (req, res) => {
  res.send("all repos fetched");
};

exports.getRepoById = (req, res) => {
  res.send("Repo details fetched for indiv user");
};

exports.getRepoByName = (req, res) => {
  res.send("Repo details fetched for name");
};

exports.getRepoForCurrentUser = (req, res) => {
  res.send("Repo details fetched for logged in user");
};

exports.updateRepoById = (req, res) => {
  res.send("Repo is update");
};

exports.deleteRepoById = (req, res) => {
  res.send("Repo is deleted");
};

exports.vivbilityToggleById = (req, res) => {
  res.send("Visibility updated");
};
