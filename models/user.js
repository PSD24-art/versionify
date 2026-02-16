const db = require("../config/mysql-config");

exports.checkExistingUser = (email) => {
  const q = "SELECT * FROM users WHERE email = ?";
};
