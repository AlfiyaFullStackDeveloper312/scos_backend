const pool = require("../../src/config/database");

const resetDatabase = async () => {
  try {
    console.log("Resetting database...");

    await pool.query(`
      TRUNCATE TABLE
        user_institute_roles,
        users,
        institutes,
        roles,
        tenants
      RESTART IDENTITY CASCADE;
    `);

    console.log("Database reset completed");
  } catch (err) {
    console.log("RESET DB ERROR:", err);
    throw err;
  }
};

module.exports = resetDatabase;