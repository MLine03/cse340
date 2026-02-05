function getNav() {
  return `<a href="/">Home</a> <a href="/inv">Inventory</a> <a href="/account/login">My Account</a>`;
}

module.exports = { getNav };

/**
 * Wrap async route handlers to catch errors and forward to Express error handler
 * @param {Function} fn - async route handler
 */
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Export it along with other utilities
module.exports = {
  getNav,        // your existing function
  // ... other utilities
  handleErrors,  // new addition
};
