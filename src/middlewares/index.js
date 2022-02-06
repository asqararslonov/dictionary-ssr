const path = require("path");
const expressEjsLayout = require("express-ejs-layouts");
const express = require("express");
const cookieParser = require("cookie-parser");
const authMiddle = require("./auth");
const expressFileupload = require("express-fileupload");

module.exports = [
  expressEjsLayout,
  expressFileupload(),
  express.urlencoded({ extended: true }),
  express.static(path.join(process.cwd(), "src", "uploads")),
  express.json(),
  cookieParser(),
  authMiddle,
];
