// External Files
require('dotenv').config();
const express = require('express'); // Express Module
const path = require('path'); // Path Module
const passport = require('passport');
const flash = require('connect-flash');
const app = express(); // Initialization of Express

// MISC
app.set('view engine', 'ejs'); // EJS Module
app.use(express.urlencoded({ extended: true })); // Unpacking req.body
app.use(express.static(path.join(__dirname, 'public'))); // Static files (css, images, client js)
//

const sessionMiddleware = require('./config/session');
app.use(sessionMiddleware);
app.use(flash());
require('./config/passport')(passport);
app.use(passport.session());


app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    console.log(req.user);
    next();
});


// Internal Files
const membersRouter = require('./routes/membersRouter'); // Path to Router
app.use('/', membersRouter); // Give all connection work to Router
//

// 404 + error handlers, must be LAST, after all routes
const notFound  = require('./middlewares/notFound'); // Path to 404 handler
const errorHandler = require('./middlewares/errorHandler'); // Path to error handler
app.use(notFound); // Catches unmatched routes
app.use(errorHandler); // Catches errors passed via next(err)

module.exports = app; // Export configured app for server.js and tests
