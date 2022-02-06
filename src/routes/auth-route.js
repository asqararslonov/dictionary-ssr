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

const wordAddPOST = require("../controller/wordController.js")

route.get("/admin/user", userIndexView);
route.get("/admin/user/create", userAddViewGET);
route.post("/admin/user/create", userAddViewPOST);

route.get("/auth/login", authLogin);
route.post("/auth/login", authLoginPOST);

route.get("/auth/logout", logout);
route.post("/addword/add", wordAddPOST);

module.exports = route;
