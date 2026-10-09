const pool = require('../../config/db'); // Path to DB connection pool

// Basic queries
exports.createMember = async (first_name, last_name, email, password) => { 
  await pool.query('INSERT INTO members (first_name, last_name, email, password) VALUES ($1,$2,$3,$4)', [first_name, last_name, email, password]); // Query DB
};

exports.updateMembership = async (id) => {
  await pool.query('UPDATE members SET is_member = true WHERE id = $1', [id]);
};

//MISC queries
exports.findByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM members WHERE email = $1', [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
  return rows[0];
};


