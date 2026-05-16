
// for render
// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// module.exports = pool;
// for pg

const { Pool } = require("pg");
const dotenv = require("dotenv");

// LOAD TEST ENV DURING JEST
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
console.log("Connected DB:", process.env.DB_NAME);

const originalEnd = pool.end.bind(pool);
let poolEnded = false;

pool.end = async () => {
  if (poolEnded) return;
  poolEnded = true;
  return originalEnd();
};

module.exports = pool;