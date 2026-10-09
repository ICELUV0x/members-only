const membersQueries = require('../db/queries/membersQueries'); // Path to the DB QUERIES
const passport = require('passport');
const bcrypt = require('bcryptjs'); //bcrypt module
const { validationResult } = require('express-validator'); // Results of Express-Valid from Router
const notFound = require('../middlewares/notFound');

//Sign-Up ----------------------------------------------------------
exports.signUpGet = (req, res) => { // GET handler, lists all items
  res.render("sign-up", { errors: [] });
};

exports.signUpPost = async (req, res, next) => { // GET handler, lists all items
  const result = validationResult(req);
  if(!result.isEmpty()) {
    return res.render('sign-up', { errors: result.array()});
  }

  const { first_name, last_name, email, password } = req.body;

  try {

    const existing = await membersQueries.findByEmail(email);
    if (existing) {
      return res.render('sign-up', { errors: [{ msg: 'Email already in use' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await membersQueries.createMember(first_name, last_name, email, hashedPassword); // Add user info into DB
    res.redirect('/log-in'); // Render view with data
  } catch (err) {
    next(err); // Pass error to errorHandler middleware
  }
};

//

//Log-In ----------------------------------------------------------
exports.logInGet = async (req, res) => { // GET handler, lists all items
  const flashFailMessage = req.flash("authFail")[0];
  const flashIsFailed = flashFailMessage? [{ msg: flashFailMessage }] : [];

  res.render("log-in", { errors: flashIsFailed });
};

exports.logInPost = async (req, res, next) => { // GET handler, lists all items
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render('log-in', { errors: result.array() });
  }

  passport.authenticate('local', {
    successRedirect: "/messages/new",
    failureRedirect: "/log-in",
    failureFlash: true,
  })(req, res, next);
};
//

//Join Membership --------------------------------------------------
exports.joinGet = async (req, res) => { // GET handler, lists all items
  if (!req.user) return res.render("log-in", { errors: [ {msg: "You should be logged-in to access this page"} ] });
  res.render('join', { errors: [] });
};

exports.joinPost = async (req, res, next) => { // GET handler, lists all items
  const passcodeInput = req.body.member_passcode;
  const id = req.user.id;

  if (passcodeInput !== process.env.CLUB_SECRET) return res.render("join", { errors: [{ msg: "Invalid passcode" }]});

  try {
    await membersQueries.updateMembership(id); // Update user is_memmber flag;
    req.flash('success','Now you signed like a member');
    res.redirect('/');
  } catch (err) {
    next(err); // Pass error to errorHandler middleware
  }
}
//

// Log-Out
exports.logOut = async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash('success','You successfully Logged Out')
    res.redirect('/');
  })
};
//
//{ successes: [{ msg: "You successfully Logged Out"}], errors: [] }