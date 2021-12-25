// Host
// ec2-52-208-221-89.eu-west-1.compute.amazonaws.com
// Database
// d1ivdvqjgn2p01
// User
// ifvuckaqbcgjsh
// Port
// 5432
// Password
// e35e07ad45ca44453a49a58e8f8670e6adfa6826bea5549caa265d9a38a7f4e6
// URI
// postgres://ifvuckaqbcgjsh:e35e07ad45ca44453a49a58e8f8670e6adfa6826bea5549caa265d9a38a7f4e6@ec2-52-208-221-89.eu-west-1.compute.amazonaws.com:5432/d1ivdvqjgn2p01
// Heroku CLI
// heroku pg:psql postgresql-amorphous-84014 --app kazeemapp
import pg from "pg";
import * as db from "../config.js";

// database connection created with the use of pool
const pool = new pg.Pool({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port,
});

// function created to query the database
async function query(text, params) {
  return pool.query(text, params);
}
