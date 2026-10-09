# Project Name

One-line description of what this does.

## Stack

Node.js, Express, PostgreSQL, EJS

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values
3. `npm run seed` — sets up the database
4. `npm run dev` — starts the dev server

## Structure

- `config/` — DB and session config
- `controllers/` — request handlers
- `db/queries/` — data access layer
- `middlewares/` — error handling, auth, etc.
- `routes/` — route definitions
- `views/` — EJS templates
