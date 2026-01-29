async function getNav() {
  return `<nav>
    <a href="/">Home</a> |
    <a href="/account/login">My Account</a>
  </nav>`
}

function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  getNav,
  handleErrors,
}
