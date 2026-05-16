const resetDatabase = require("./reset.seed");

const seedTenants = require("./tenants.seed");
const seedRoles = require("./roles.seed");
const seedInstitutes = require("./institutes.seed");
const seedUsers = require("./users.seed");
const seedMappings = require("./mappings.seed");

const runSeeds = async () => {
  try {
    await resetDatabase();

    // IMPORTANT ORDER
    await seedTenants();
    await seedRoles();
    await seedInstitutes();
    await seedUsers();
    await seedMappings();

    console.log("All seeds executed successfully");

    process.exit();
  } catch (err) {
    console.log("SEED ERROR:", err);

    process.exit(1);
  }
};

runSeeds();