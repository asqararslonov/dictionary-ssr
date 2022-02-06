const express = require("express");
const route = express.Router();
const {
  logout,
  userIndexView,
  userAddViewGET,
  userAddViewPOST,
  authLogin,
  authLoginPOST,
} = require("../controller/authController");

const {
  wordAddPOST,
  addWordAdmin,
} = require("../controller/wordController.js");

route.get("/admin/words", userIndexView);
// route.get("/admin/word/add/:id", addWordAdmin);
route.get("/admin/words/create", userAddViewGET);
route.post("/admin/words/create", userAddViewPOST);

route.get("/auth/login", authLogin);
route.post("/auth/login", authLoginPOST);

route.get("/auth/logout", logout);
// route.post("/addword/add", wordAddPOST);

module.exports = route;
