const {
  creaeRepo,
  createRepo,
  getAllReposQ,
  getRepoById,
  getRepoByName,
  getRepoByIdQ,
  getRepoByNameQ,
  getReposByUserId,
} = require("../models/repos.queries");

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

exports.getAllRepos = async (req, res) => {
  try {
    const repos = await getAllReposQ();
    res.json({ repos });
  } catch (e) {
    console.error("error fetching repos", e);
    res.status(500).json({ message: "Failed to fetch repos" });
  }
};

exports.getRepoById = async (req, res) => {
  const repoId = req.params.id;

  try {
    const repo = await getRepoByIdQ(repoId);
    res.json({ repo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to fetch One repository" });
  }
};

exports.getRepoByName = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const repo = await getRepoByNameQ(name);
    res.json({ repo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to fetch One repository" });
  }
};

exports.getRepoForCurrentUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await getReposByUserId(userId);

    if (result.length < 1) {
      return res
        .status(404)
        .json({ error: "No repositories found for the requested user" });
    }

    res.json({ result });
  } catch (e) {
    console.log(e);
    res.json({ message: "Error fetching repositories" });
  }
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
