const pool = require('../../config/db'); // Path to DB connection pool

exports.getAllForMember = async () => { // Fetch all rows
  const { rows } = await pool.query('SELECT messages.id, messages.title, messages.text, messages.timestamp, members.first_name as author FROM messages JOIN members ON messages.member_id = members.id'); // Query DB
  return rows;
};

exports.getAllForNAM = async () => {
  const { rows } = await pool.query('SELECT messages.title, messages.text FROM messages JOIN members ON messages.member_id = members.id'); // Query DB
  return rows;
};

exports.createMessage = async (memberId, title, message) => {
  await pool.query('INSERT INTO messages (member_id, title, text) VALUES ($1, $2, $3)', [memberId, title, message]);
}

exports.deleteMessage = async (id) => {
  await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}