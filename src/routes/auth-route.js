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
  wordAdminGET,
  addWordAdmin,
  wordAdminPOST,
  deleteWordAdmin,
} = require("../controller/wordController.js");

route.get("/admin/words", userIndexView);
route.get("/admin/word/create", wordAdminGET);
route.post("/admin/word/create", wordAdminPOST);
route.get("/admin/word/add/:id", addWordAdmin);
route.get("/admin/word/delete/:id", deleteWordAdmin);
route.get("/admin/words/create", userAddViewGET);
route.post("/admin/words/create", userAddViewPOST);

route.get("/admin/db", userIndexView)
route.get("/admin/db/create", wordAdminGET);
route.post("/admin/db/create", wordAdminPOST);
route.get("/admin/db/add/:id", addWordAdmin);
route.get("/admin/db/delete/:id", deleteWordAdmin);
route.get("/admin/db/edit/:id", deleteWordAdmin);
route.post("/admin/db/edit/:id", deleteWordAdmin);
route.get("/admin/db/create", userAddViewGET);
route.post("/admin/db/create", userAddViewPOST);

route.get("/auth/login", authLogin);
route.post("/auth/login", authLoginPOST);

route.get("/auth/logout", logout);
route.post("/addword/add", wordAddPOST);

module.exports = route;
