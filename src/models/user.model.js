const pool = require("../config/database");

exports.createUser = async (data) => {
  const { first_name, last_name, email, mobile, password_hash } = data;

  const res = await pool.query(
    `INSERT INTO users 
    (first_name, last_name, full_name, email, mobile, password_hash)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      first_name,
      last_name,
      `${first_name} ${last_name}`,
      email,
      mobile,
      password_hash,
    ]
  );

  return res.rows[0];
};

exports.getUserByEmail = async (email) => {
  const res = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return res.rows[0];
};

exports.getAllUsers = async () => {
  const res = await pool.query("SELECT * FROM users");
  return res.rows;
};