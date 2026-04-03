const pool = require("../config/database");

// CREATE INSTITUTE
exports.createInstitute = async (data) => {
  const { tenant_id, name, code, type } = data;

  const res = await pool.query(
    `INSERT INTO institutes 
    (tenant_id, name, code, type, status)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [tenant_id, name, code, type, "active"]
  );

  return res.rows[0];
};

// GET ALL INSTITUTES
exports.getAllInstitutes = async () => {
  const res = await pool.query("SELECT * FROM institutes");
  return res.rows;
};