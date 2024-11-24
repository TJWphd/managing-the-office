import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.username,
  password: process.env.password,
  host: "localhost",
  database: process.env.db,
});

const connection = async () => {
  try {
    await pool.connect();
    console.log("connected to the database");
  } catch (error) {
    console.log("error connecting to database");
    process.exit(1);
  }
};

export { pool, connection };
