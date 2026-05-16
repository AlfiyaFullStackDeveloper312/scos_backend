const pool = require("../../src/config/database");
const bcrypt = require("bcrypt");

const seedUsers = async () => {
  try {
    console.log("Seeding users...");

    const passwordHash = await bcrypt.hash("123456", 10);

    const users = [
      {
        first_name: "Ava",
        last_name: "SCOS",
        full_name: "Ava SCOS",
        email: "ava@scos.com",
        mobile: "9999999991",
      },
      {
        first_name: "Teacher",
        last_name: "User",
        full_name: "Teacher User",
        email: "teacher@scos.com",
        mobile: "9999999992",
      },
      {
        first_name: "Student",
        last_name: "User",
        full_name: "Student User",
        email: "student@scos.com",
        mobile: "9999999993",
      },
    ];

    for (const user of users) {
      await pool.query(
        `
        INSERT INTO users
        (
          first_name,
          last_name,
          full_name,
          email,
          mobile,
          password_hash,
          status
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        `,
        [
          user.first_name,
          user.last_name,
          user.full_name,
          user.email,
          user.mobile,
          passwordHash,
          "active",
        ]
      );
    }

    console.log("Users seeded successfully");
  } catch (err) {
    console.log("USER SEED ERROR:", err);
    throw err;
  }
};

module.exports = seedUsers;