import mysql from 'mysql2/promise';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

if (!env.DB_USER || !env.DB_PASSWORD || !env.DB_NAME) {
  throw new Error('Missing required database environment variables: DB_USER, DB_PASSWORD, DB_NAME');
}

const pool = mysql.createPool({
  host: env.DB_HOST || 'localhost',
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});

export async function GET({ url, request }) {
  // Check API key
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== env.API_SECRET_KEY) {
    throw error(401, 'Unauthorized');
  }
  
  const hours = url.searchParams.get('hours') || '1';
  
  const [rows] = await pool.query(
    `SELECT email, username, joined_at 
     FROM users 
     WHERE joined_at > DATE_SUB(NOW(), INTERVAL ? HOUR)
     ORDER BY joined_at DESC`,
    [hours]
  );
  
  return json(rows);
}

