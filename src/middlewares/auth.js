const generateToken = require("../lib/generate-token");
const fs = require("fs/promises");
const path = require("path");

async function loadUser() {
  let data = await fs.readFile(
    path.join(process.cwd(), "src", "database", "user.json"),
    "utf-8"
  );
  return data ? JSON.parse(data) : [];
}

async function authMiddle(req, res, next) {
  if (req.url.includes("/auth")) return next();
  if (req.url.includes("/admin")) {
    if (req.cookies.token) {
      const { id } = generateToken.myVerify(req.cookies.token);
      if (!id) return res.redirect("/auth/login");
      let users = await loadUser();
      let user = users.find((el) => el["id"] == id);
      if (user) {
        req.user = user;
        return next();
      } else {
        return res.redirect("/auth/login");
      }
    } else {
      return res.redirect("/auth/login");
    }
  }

  return next();
}

module.exports = authMiddle;
