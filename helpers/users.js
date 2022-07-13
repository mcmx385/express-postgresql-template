import { pool } from '../db.js'

export async function getUser(obj) {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2 ORDER BY id ASC', [obj.username, obj.password]);
    return rows;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

export async function createUser(obj) {
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [obj.username, obj.password])
    return result;
  } catch (e) {
    console.log(e)
    throw e;
  }
}
