const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("error", {
    message: err.message || "Internal Server Error",
    status: err.status || 500
  });
};

export default errorMiddleware;