const fs = require("fs/promises");
const path = require("path");
const generateToken = require("../lib/generate-token");

async function loadUser() {
  let data = await fs.readFile(
    path.join(process.cwd(), "src", "database", "user.json"),
    "utf-8"
  );
  return data ? JSON.parse(data) : [];
}
async function loadWord() {
  let data = await fs.readFile(
    path.join(process.cwd(), "src", "database", "new.json"),
    "utf-8"
  );
  return data ? JSON.parse(data) : [];
}

async function addUser(fullName, username, password) {
  if (fullName && username && password) {
    let users = await loadUser();
    let user = users.find((el) => el["username"] == username);
    if (user) {
      return { ok: false, message: "alredy username exists" };
    }

    let newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      fullName,
      username,
      password,
    };
    users.push(newUser);
    await fs.writeFile(
      path.join(process.cwd(), "src", "database", "user.json"),
      JSON.stringify(users, null, 4)
    );
    return { ok: true, message: "user created" };
  } else {
    return { ok: false, message: "error" };
  }
}
async function addWord(title, description) {
  if (title && description) {
    let words = await loadWord();
    let word = words.find((el) => el["title"] == title);
    if (word) {
      return { ok: false, message: "alredy username exists" };
    }

    let newUser = {
      id: words.length ? words[words.length - 1].id + 1 : 1,
      title,
      description,
    };
    users.push(newUser);
    await fs.writeFile(
      path.join(process.cwd(), "src", "database", "user.json"),
      JSON.stringify(users, null, 4)
    );
    return { ok: true, message: "user created" };
  } else {
    return { ok: false, message: "error" };
  }
}

const userIndexView = async (req, res) => {
  let users = await loadWord();
  return res.render("pages/admin/auth/index", { data: users });
};

const userAddViewGET = async (req, res) => {
  return res.render("pages/admin/auth/create", {
    ok: false,
    message: "",
    method: "GET",
  });
};

const userAddViewPOST = async (req, res) => {
  const { fullName, username, password } = req.body;
  const { ok, message } = await addUser(fullName, username, password);
  if (ok) {
    return res.redirect("/admin/user");
  }
  return res.render("pages/admin/auth/create", {
    ok,
    message: message,
    method: "POST",
  });
};

const authLogin = (req, res) => {
  return res.render("pages/admin/auth/login", {
    layout: "layout/auth_layout",
    ok: false,
    method: "GET",
  });
};

const authLoginPOST = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    let users = await loadUser();
    let user = users.find(
      (el) => el["username"] == username && el["password"] == password
    );

    if (user) {
      let token = generateToken.mySign({ id: user["id"] });
      return res.cookie("token", token).redirect("/admin/words");
    } else {
      return res.render("pages/admin/auth/login", {
        layout: "layout/auth_layout",
        ok: false,
        method: "POST",
      });
    }
  } else {
    return res.render("pages/admin/auth/login", {
      layout: "layout/auth_layout",
      ok: false,
      method: "POST",
    });
  }
};

const logout = (req, res) => {
  return res.cookie("token", "").redirect("/auth/login");
};
// const wordGET = (req, res) => {
//   const {word, description} = req.body
//   if(word && description){
//     console.log(word, description)
//   }
// }

module.exports = {
  userIndexView,
  userAddViewGET,
  userAddViewPOST,
  authLogin,
  authLoginPOST,
  logout,
  // wordGET
};
