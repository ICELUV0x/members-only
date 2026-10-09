const messagesQueries = require('../db/queries/messagesQueries'); // Path to the DB QUERIES
const { validationResult } = require('express-validator'); // Results of Express-Valid from Router

exports.index =  async (req, res, next) => { // GET handler, lists all items
  const msgCreatedFlash = req.flash('success')[0];
  const flashIsSuccessfull = msgCreatedFlash? [{ msg: msgCreatedFlash }] : [];

  try {

    if (req.user && (req.user.is_member || req.user.is_admin)) {  
      const result = await messagesQueries.getAllForMember();
      return res.render('index', { messages: result, successes: flashIsSuccessfull , errors: [] });

    } else if (req.user) {
      const result = await messagesQueries.getAllForNAM(); // Fetch all rows from DB
      return res.render('index', { messages: result, successes: flashIsSuccessfull , errors: []  }); // Render view with data 
      
    } else {
      const result = await messagesQueries.getAllForNAM();
      return res.render('index', { messages: result, successes: flashIsSuccessfull , errors: []  });
    }
  } catch (err) {
    next(err); // Pass error to errorHandler middleware
  }
}

exports.newGet = async (req, res, next) => {
  if (!req.user) return res.render("log-in", { errors: [ {msg: "You should be logged-in to access this page"} ] });
  res.render('message-form', { errors: [] });
};

exports.newPost = async (req, res, next) => {
  const { title, message } = req.body;
  const memberId = req.user.id;

  try {
    await messagesQueries.createMessage(memberId, title, message);
    req.flash('success','Message successfully created');
    res.redirect('/');
  } catch(err) {
    next(err);
  } 
};

exports.deleteGet = async ( req, res, next ) => {
    const id = req.params.id;
    try {
      await messagesQueries.deleteMessage(id);
      req.flash('success','Message succesfully deleted');
      res.redirect('/');
    } catch (err) {
      next(err);
    }
} 
