// const express = require("express");
// const router = express.Router();
// const pool = require("../config/database");

// // CREATE mapping
// router.post("/", async (req, res) => {
//   try {
//     const {
//       tenant_id,
//       user_id,
//       institute_id,
//       role_id,
//       is_primary
//     } = req.body;

//     const query = `
//       INSERT INTO user_institute_roles
//       (tenant_id, user_id, institute_id, role_id, is_primary, status)
//       VALUES ($1, $2, $3, $4, $5, 'active')
//       RETURNING *;
//     `;

//     const values = [
//       tenant_id,
//       user_id,
//       institute_id,
//       role_id,
//       is_primary
//     ];

//     const result = await pool.query(query, values);

//     res.json({
//       success: true,
//       data: result.rows[0],
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error creating mapping",
//     });
//   }
// });

// module.exports = router;