require("dotenv").config();
const { Pool } = require('pg'); // Pool object from pg Module

//External DB
const pool = new Pool({ // Initialization of connection pool
  connectionString: process.env.DATABASE_URL, // DB connection string from .env
  ssl: {
    rejectUnauthorized: false, // Required for hosted Postgres (e.g. Neon, Render)
  },
});



module.exports = pool; // Export pool for use in db/queries files
