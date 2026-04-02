// /utilities/errorHandler.js

/**
 * Wraps async route handlers to catch errors
 * and pass them to Express error handling
 */
export function handleErrors(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      console.error(err); // log the error
      res.status(500).send("Server Error");
    }
  };
}