require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
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