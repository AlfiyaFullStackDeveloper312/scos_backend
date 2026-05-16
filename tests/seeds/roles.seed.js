const pool = require("../../src/config/database.js");

const seedRoles = async () => {
  try {
    console.log("Seeding roles...");

    const roles = [
      {
        name: "Admin",
        code: "ADMIN",
        description: "System Admin",
      },
      {
        name: "Teacher",
        code: "TEACHER",
        description: "Institute Teacher",
      },
      {
        name: "Student",
        code: "STUDENT",
        description: "Institute Student",
      },
    ];

    for (const role of roles) {
      await pool.query(
        `
        INSERT INTO roles
        (name, code, description, status)
        VALUES ($1, $2, $3, $4)
        `,
        [
          role.name,
          role.code,
          role.description,
          "active",
        ]
      );
    }

    console.log("Roles seeded successfully");
  } catch (err) {
    console.log("ROLE SEED ERROR:", err);
  }
};

module.exports = seedRoles;