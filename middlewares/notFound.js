function notFound (req, res, next) { // Triggers when no route matched
  res.status(404); // Set 404 status
  res.render('partials/errors', { // Render shared error view
    message: 'Page not found',
    status: 404,
  });
}

module.exports = notFound;