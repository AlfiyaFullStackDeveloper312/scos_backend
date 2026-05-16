const pool = require("../config/database");

// CREATE MAPPING
exports.createMapping = async (data) => {
  const { tenant_id, user_id, institute_id, role_id, is_primary } = data;

  const res = await pool.query(
    `INSERT INTO user_institute_roles
    (tenant_id, user_id, institute_id, role_id, is_primary, status)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [tenant_id, user_id, institute_id, role_id, is_primary, "active"],
  );

  return res.rows[0];
};

// GET ALL MAPPINGS
exports.getAllMappings = async () => {
  const res = await pool.query(
    `SELECT 
      uir.id,
      uir.tenant_id,
      uir.user_id,
      u.full_name,
      uir.institute_id,
      i.name AS institute_name,
      uir.role_id,
      r.name AS role_name,
      uir.is_primary,
      uir.status
    FROM user_institute_roles uir
    JOIN users u ON u.id = uir.user_id
    JOIN institutes i ON i.id = uir.institute_id
    JOIN roles r ON r.id = uir.role_id`,
  );

  return res.rows;
};
