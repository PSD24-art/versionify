const db = require("../config/mysql-config");

exports.createRepo = async (userId, name, description, visibility) => {
  const q =
    "INSERT INTO repositories (owner_id, name, description, visibility) VALUES(?,?,?,?)";

  const [result] = await db.query(q, [userId, name, description, visibility]);
  return result;
};
