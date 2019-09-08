function errorHandler (err, req, res, next) {
	console.log('called');
  if (res.headersSent) {
    return next(err)
  }
  res.status(500);
  res.json({ error: err });
}

module.exports = errorHandler;