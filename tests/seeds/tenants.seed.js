const pool = require("../../src/config/database");

const seedTenants = async () => {
  try {
    console.log("Seeding tenants...");

    await pool.query(`
      INSERT INTO tenants
      (
        id,
        name,
        code,
        status,
        created_at,
        updated_at
      )
      VALUES
      (
        1,
        'SCOS Tenant',
        'SCOS001',
        'active',
        NOW(),
        NOW()
      );
    `);

    console.log("Tenants seeded successfully");
  } catch (err) {
    console.log("TENANT SEED ERROR:", err);
    throw err;
  }
};

module.exports = seedTenants;