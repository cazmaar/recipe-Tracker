import pg from "pg";
// import { dbTest, dbProd, Env } from "../config.js";


// database connection created with the use of pool
//  let enviroment = "";
//  Env === "test" ? (enviroment = dbTest) : (enviroment = dbProd);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// function created to query the database
export default async function query(text, params) {
  return pool.query(text, params);
}
