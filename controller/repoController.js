exports.createRepo = (req, res) => {
  res.send("all repos fetched");
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
