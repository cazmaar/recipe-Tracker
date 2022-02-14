export const dbProd = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false }
};
export const dbTest = {
  user: process.env.PG_USER_TEST,
  host: process.env.PG_HOST_TEST,
  database: process.env.PG_DATABASE_TEST,
  password: process.env.PG_PASSWORD_TEST,
  port: process.env.PG_PORT_TEST
};

export const Env = process.env.NODE_ENV