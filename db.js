import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } from "./config.js";
import pg from "pg";

const Pool = pg.Pool
export const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT
})