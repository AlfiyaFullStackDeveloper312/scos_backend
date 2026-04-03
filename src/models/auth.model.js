const pool = require("../config/database");

// 🔹 GET USER BY EMAIL
exports.getUserByEmail = async (email) => {
  const res = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return res.rows[0];
};

// 🔹 GET INSTITUTES + ROLES
exports.getInstitutesRolesByUser = async (user_id) => {
  const res = await pool.query(
    `SELECT 
      uir.tenant_id,
      uir.institute_id,
      i.name AS institute_name,
      r.id AS role_id,
      r.name AS role_name
    FROM user_institute_roles uir
    JOIN institutes i ON i.id = uir.institute_id
    JOIN roles r ON r.id = uir.role_id
    WHERE uir.user_id = $1`,
    [user_id]
  );

  return res.rows;
};

// 🔹 VALIDATE CONTEXT
exports.checkUserContext = async (
  user_id,
  tenant_id,
  institute_id,
  role_id
) => {
  const res = await pool.query(
    `SELECT * FROM user_institute_roles
     WHERE user_id = $1 
     AND tenant_id = $2 
     AND institute_id = $3 
     AND role_id = $4`,
    [user_id, tenant_id, institute_id, role_id]
  );

  return res.rows[0];
};