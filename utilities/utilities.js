async function getNav() {
  return [
    { name: "Home", link: "/" },
    { name: "Register", link: "/account/register" },
    { name: "Login", link: "/account/login" },
  ];
}

module.exports = { getNav };
