function errorHandler (err, req, res, next) { // Catches errors passed via next(err)
  console.error(err); // Log error to console

  const status = err.status || 500; // Use error's status or default to 500
  res.status(status);
  res.render('partials/errors', { // Render shared error view
    message: err.message || 'Something went wrong',
    status,
  });
}


module.exports = errorHandler;