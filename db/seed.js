require('dotenv').config();
const { Client } = require('pg'); // Client Module

// SQL QUERY
const SQL = `

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS members_sessions;

CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id),
  title VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  text TEXT NOT NULL
);

CREATE TABLE "members_sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);

ALTER TABLE "members_sessions" ADD CONSTRAINT "members_sessions_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_members_sessions_expire" ON "members_sessions" ("expire");
`;

// Client one-time reach to DB
async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // node db/seed.js [DATABASE_URL] (URL argument variable) or just ENV
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main(); // Func initialization
