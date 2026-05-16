const { execSync } = require("child_process");
const pool = require("../src/config/database");

beforeAll(() => {
  console.log("Preparing test database...");

  execSync("npm run seed", {
    stdio: "inherit",
  });
});

beforeEach(() => {
  console.log("Starting test...");
});

afterEach(() => {
  console.log("Test finished...");
});

afterAll(async () => {
  console.log("Closing database connection...");

  await pool.end();
});