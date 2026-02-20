const db = require("../config/mysql-config");

exports.createRepo = async (userId, name, description, visibility) => {
  const q =
    "INSERT INTO repositories (owner_id, name, description, visibility) VALUES(?,?,?,?)";

  const [result] = await db.query(q, [userId, name, description, visibility]);
  return result;
};

exports.getAllReposQ = async () => {
  const q =
    "SELECT repositories.id AS repo_id, repositories.name AS repo_name, repositories.description, users.id AS owner_id, users.username, users.email FROM repositories JOIN users ON repositories.owner_id = users.id";

  const [result] = await db.query(q);
  return result;
};

exports.getRepoByIdQ = async (id) => {
  const q = "SELECT * FROM repositories WHERE id=?";

  const [result] = await db.query(q, [id]);

  return result[0];
};

exports.getRepoByNameQ = async (name) => {
  const q = "SELECT * FROM repositories WHERE name=?";

  const [result] = await db.query(q, [name]);

  return result[0];
};

exports.getReposByUserId = async (id) => {
  const q = "SELECT * FROM repositories WHERE owner_id=?";

  const [result] = await db.query(q, [id]);

  return result;
};
