const pool = require("../../src/config/database");

const seedMappings = async () => {
  try {
    console.log("Seeding mappings...");

    await pool.query(`
      INSERT INTO user_institute_roles
      (
        tenant_id,
        user_id,
        institute_id,
        role_id,
        is_primary,
        status
      )
      VALUES
      (1, 1, 1, 1, true, 'active'),
      (1, 2, 1, 2, true, 'active'),
      (1, 3, 2, 3, true, 'active');
    `);

    console.log("Mappings seeded successfully");
  } catch (err) {
    console.log("MAPPING SEED ERROR:", err);
    throw err;
  }
};

module.exports = seedMappings;