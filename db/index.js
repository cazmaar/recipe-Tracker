import pg from "pg";
import * as db from "../config.js";

// database connection created with the use of pool
const pool = new pg.Pool({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port,
  ssl: { rejectUnauthorized: false },
});

// function created to query the database
export default async function query(text, params) {
  return pool.query(text, params);
}
