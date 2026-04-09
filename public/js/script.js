// public/js/script.js

console.log("script.js loaded successfully");

// Show / hide password toggle
const pswdBtn = document.getElementById("pswdBtn");
const passwordField = document.getElementById("password");

if (pswdBtn && passwordField) {
  pswdBtn.addEventListener("click", () => {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      pswdBtn.textContent = "Hide Password";
    } else {
      passwordField.type = "password";
      pswdBtn.textContent = "Show Password";
    }
  });
}