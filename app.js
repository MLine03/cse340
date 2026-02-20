const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./database/db"); // same Pool you use everywhere
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(session({
  store: new pgSession({
    pool: db,           // ← same DB connection
    tableName: "session" 
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24*60*60*1000 } // 1 day
}));

module.exports = app;