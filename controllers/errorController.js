export const notFoundHandler = (req, res, next) => {
  res.status(404).render('error', { message: 'Page not found', status: 404 });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: err.message || 'Server error', status: 500 });
};