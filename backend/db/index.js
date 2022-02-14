import pg from "pg";
import { dbTest, dbProd, Env } from "../config.js";
// database connection created with the use of pool
// let enviroment = "";
// Env === "test" ? (enviroment = dbTest) : (enviroment = dbProd);
// console.log(enviroment)
const pool = new pg.Pool(dbProd);

// function created to query the database
export default async function query(text, params) {
  return pool.query(text, params);
}
