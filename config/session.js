const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db');

const configuredSession = session({
    store: new pgSession({
        pool: pool,
        tableName: 'members_sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
});

module.exports = configuredSession;





























/* const session = require('express-session'); // Express-session Module
const pgSession = require('connect-pg-simple')(session); // Postgres session store
const pool = require('./db');


module.exports = session({ // Export configured session middleware
    store: new pgSession({ 
        pool: pool, // Reuse existing DB pool
        tableName: 'members_sessions', // Must match table created in DB
    }),
    secret: process.env.SESSION_SECRET, // Secret from .env
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});

 */