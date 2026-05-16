const pool = require("../../src/config/database");

const seedInstitutes = async () => {
  try {
    console.log("Seeding institutes...");

    const institutes = [
      {
        tenant_id: 1,
        name: "SCOS School",
        code: "SCOS001",
        type: "School",
        inst_location: "Nagpur",
        inst_logo: "logo1.png",
      },
      {
        tenant_id: 1,
        name: "SCOS College",
        code: "SCOS002",
        type: "College",
        inst_location: "Pune",
        inst_logo: "logo2.png",
      },
    ];

    for (const institute of institutes) {
      await pool.query(
        `
        INSERT INTO institutes
        (tenant_id, name, code, type, inst_location, inst_logo, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          institute.tenant_id,
          institute.name,
          institute.code,
          institute.type,
          institute.inst_location,
          institute.inst_logo,
          "active",
        ]
      );
    }

    console.log("Institutes seeded successfully");
  } catch (err) {
    console.log("INSTITUTE SEED ERROR:", err);
  }
};

module.exports = seedInstitutes;