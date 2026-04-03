const pool = require("../config/database");

// CREATE ROLE
exports.createRole = async (data) => {
  const { name, code, description } = data;

  const res = await pool.query(
    `INSERT INTO roles 
    (name, code, description, status)
    VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, code, description || null, "active"]
  );

  return res.rows[0];
};

// GET ALL ROLES
exports.getAllRoles = async () => {
  const res = await pool.query("SELECT * FROM roles");
  return res.rows;
};