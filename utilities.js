// Error handler wrapper
function handleErrors(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// Navigation builder
async function getNav() {
  return `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/account">Account</a></li>
      <li><a href="/inventory">Inventory</a></li>
    </ul>
  `
}

module.exports = { handleErrors, getNav }
