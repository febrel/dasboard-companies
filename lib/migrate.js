const { Pool } = require("pg");
const { readFileSync } = require("fs");
const { join } = require("path");

async function migrate() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const sql = readFileSync(
    join(__dirname, "..", "prisma", "init.sql"),
    "utf-8"
  );

  try {
    await pool.query(sql);
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
