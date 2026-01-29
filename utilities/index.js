function handleErrors(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

async function getNav() {
  return `<nav><a href="/">Home</a> | <a href="/account/register">Register</a> | <a href="/account/login">Login</a></nav>`;
}

module.exports = { handleErrors, getNav };
