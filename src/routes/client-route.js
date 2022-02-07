const express = require("express");
const route = express.Router();
const {
  indexView,
  postView,
  wordPOST,
  wordGET,
} = require("../controller/clienController");

route.get("/", indexView);

route.get("/post/:id", postView);
route.get("/addword/", wordGET);
// route.post("/addword/add", wordP/\OST);

module.exports = route;
