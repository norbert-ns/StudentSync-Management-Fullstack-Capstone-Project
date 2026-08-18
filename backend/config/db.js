const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection immediately on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ POSTGRES CONNECTION ERROR:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL database successfully!');
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};