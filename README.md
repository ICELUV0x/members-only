# Members Only

A message board built with Node.js, Express and PostgreSQL. Anyone can read messages, but only members can see who wrote them and when.

Built as part of [The Odin Project](https://www.theodinproject.com/) Node.js course.

## Features

- Sign up and log in with email and password (Passport local strategy, passwords hashed with bcrypt)
- Sessions stored in PostgreSQL
- Members can post messages with a title and text
- Two views of the message board:
  - **Members** see title, text, author and timestamp
  - **Non-members** see only title and text
- Form validation with express-validator
- Flash messages for feedback (errors, success)
- Users become members by entering a secret passcode
- Admin role with extra privileges. There is no admin page, so the role is granted manually in the database.

## Tech stack

- **Runtime / server:** Node.js, Express
- **Views:** EJS
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Prisma 7 (with `@prisma/adapter-pg`)
- **Auth:** Passport (`passport-local`), bcryptjs, express-session, connect-pg-simple
- **Other:** express-validator, connect-flash, dotenv
- **Hosting:** Render

## Project structure

```
.
├── controllers/        # Route handlers
├── db/
│   ├── queries/        # Database functions (Prisma calls)
│   ├── generated/      # Generated Prisma Client (not in git)
│   └── seed.js         # Seed data
├── lib/
│   └── prisma.js       # Shared Prisma Client instance
├── middlewares/        # Auth, validators, error handling
├── prisma/
│   └── schema.prisma   # Database models
├── public/             # Static files (css, js, images)
├── routes/
├── views/              # EJS templates
├── prisma7.config.js   # Prisma CLI config
└── server.js
```

## Database

Two main models, defined in `prisma/schema.prisma`:

- `members`: first name, last name, email, password
- `messages`: title, text, timestamp, linked to its author in `members` through `member_id`

## Getting started

### Requirements

- Node.js
- A PostgreSQL database (local or hosted, e.g. Neon)

### Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone <repo-url>
   cd node-members-only
   npm install
   ```

2. Create a `.env` file in the project root:

   ```
   DATABASE_URL=postgresql://user:password@host/dbname
   SESSION_SECRET=your-secret
   ```

3. Generate the Prisma Client. It is not stored in git, so this step is required after every fresh clone:

   ```bash
   npx prisma generate
   ```

4. If your database is empty, create the tables:

   ```bash
   npx prisma migrate dev --name init
   ```

5. (Optional) Fill the database with test data:

   ```bash
   npm run seed
   ```

6. Start the app:

   ```bash
   npm run dev     # development, restarts on changes
   npm start       # production
   ```

The app runs on `http://localhost:3000` unless the `PORT` environment variable is set.

## Deployment (Render)

- **Build command:** `npm install && npx prisma generate`
- **Start command:** `npm start`
- **Environment variables:** `DATABASE_URL`, `SESSION_SECRET`

The `npx prisma generate` step in the build command is required, because the generated client is not committed to git.

## Notes

- Prisma is pinned to version 7. Running `npx prisma` without a local install pulls a newer major version with a different CLI, so keep `prisma` and `@prisma/client` pinned in `package.json`.
