const db = require("../config/mysql-config");

exports.checkExistingUser = async (email) => {
  const q = "SELECT * FROM users WHERE email = ?";
  const [user] = await db.query(q, [email]);
  // console.log(user);
  return user[0];
};

exports.getUserById = async (id) => {
  const q = "SELECT * FROM users WHERE id = ?";
  const [user] = await db.query(q, [id]);
  console.log(user);
  return user[0];
};

exports.feedUser = async (username, email, password) => {
  const q = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
  const [result] = await db.query(q, [username, email, password]);
  return result;
};

exports.getAllUsers = async () => {
  const q = "SELECT * FROM users";
  const [result] = await db.query(q);
  return result;
};
