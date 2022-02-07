const fs = require("fs/promises");
const path = require("path");

async function wordGET(word, description, admin) {
  if (word && description) {
    let words = await loadWord(
      path.join(process.cwd(), "src", "database", "post.json")
    );
    let newWords = await loadWord(
      path.join(process.cwd(), "src", "database", "new.json")
    );
    let $word = words.find((el) => el["title"] == word);
    let desc = words.find((el) => el["description"] == description);
    let $newWord = newWords.find((el) => el["title"] == word);
    let newDesc = newWords.find((el) => el["description"] == description);
    if ($word || (desc && $newWord) || newDesc) {
      return { ok: false, message: "word exists" };
    }

    const newWord = {
      id: newWords.length ? newWords[newWords.length - 1].id + 1 : 1,
      title: word,
      description,
    };
    // let newUser = {
    //     id: users.length ? users[users.length - 1].id + 1 : 1,
    //
    // }

    newWords.push(newWord);

    await fs.writeFile(
      path.join(process.cwd(), "src", "database", "new.json"),
      JSON.stringify(newWords, null, 4)
    );
    return { ok: true, message: "user created" };
  } else {
    return { ok: false, message: "error" };
  }
}

async function loadWord(read) {
  let data = await fs.readFile(read, "utf-8");
  return data ? JSON.parse(data) : [];
}

const wordAdminPOST = async (req, res) => {
  const { title, description } = req.body;
  if (title && description) {
    let words = await loadWord(
      path.join(process.cwd(), "src", "database", "post.json")
    );
    let $word = words.find((el) => el["title"] == title);
    let desc = words.find((el) => el["description"] == description);
    console.log($word);
    if ($word || desc) {
      res.redirect("/");
      res.json({ ok: false, data: { message: "ishlamadi" } });
    }
    const newWord = {
      id: words.length ? words[words.length - 1].id + 1 : 1,
      title,
      description,
    };
    words.push(newWord);

    await fs.writeFile(
      path.join(process.cwd(), "src", "database", "post.json"),
      JSON.stringify(words, null, 4)
    );
    return { ok: true, message: "user created" };
  } else {
    res.redirect("/admin/words");
  }
  console.log(req.body);
};
const wordAddPOST = async (req, res) => {
  const { word, description } = req.body;
  const { ok, message } = await wordGET(word, description);
  if (ok) {
    return res.redirect("/");
  }
  // return res.render('pages/admin/auth/create', { ok, message: message, method: 'POST' })
};

const addWordAdmin = async (req, res) => {
  let id = req.path.split("/")[req.path.split("/").length - 1]; // id
  // databases
  let words = await loadWord(
    path.join(process.cwd(), "src", "database", "new.json")
  );
  let realWords = await loadWord(
    path.join(process.cwd(), "src", "database", "post.json")
  );

  console.log(id);
  let userDB = words.filter((el) => el["id"] == id); // filtered from database from users
  let adminDB = realWords.filter((el) => el["id"] == id); // filtered from database from users
  if (userDB) process.setMaxListeners(0);

  console.log(userDB[0]["title"]);
  const newWord = {
    id: realWords.length ? realWords[realWords.length - 1].id + 1 : 1,
    title: userDB[0]["title"],
    description: userDB[0]["description"],
  };

  realWords.push(newWord);
  console.log(realWords);
  let newArr = words.filter((el) => el.id != id);
  await fs.writeFile(
    path.join(process.cwd(), "src", "database", "new.json"),
    JSON.stringify(newArr, null, 4)
  );
  res.json({ ok: true, data: newArr });
  await fs.writeFile(
    path.join(process.cwd(), "src", "database", "post.json"),
    JSON.stringify(realWords, null, 4)
  );
  res.redirect("/admin/words");
};

const wordAdminGET = (req, res) => {
  return res.render("../views/pages/admin/auth/addWord.ejs");
};

const deleteWordAdmin = async (req, res) => {
  let id = req.path.split("/")[req.path.split("/").length - 1]; // id
  // databases
  let words = await loadWord(
    path.join(process.cwd(), "src", "database", "new.json")
  );
  let realWords = await loadWord(
    path.join(process.cwd(), "src", "database", "post.json")
  );

  console.log(id);
  let userDB = words.filter((el) => el["id"] == id); // filtered from database from users
  let adminDB = realWords.filter((el) => el["id"] == id); // filtered from database from users
  if (userDB) process.setMaxListeners(0);

  console.log(userDB[0]["title"]);
  const newWord = {
    id: realWords.length ? realWords[realWords.length - 1].id + 1 : 1,
    title: userDB[0]["title"],
    description: userDB[0]["description"],
  };

  realWords.push(newWord);
  console.log(realWords);
  let newArr = words.filter((el) => el.id != id);
  await fs.writeFile(
    path.join(process.cwd(), "src", "database", "new.json"),
    JSON.stringify(newArr, null, 4)
  );
  // res.json({ok:true, data: newArr})
  res.redirect("/admin/words");
};

module.exports = {
  wordAddPOST,
  addWordAdmin,
  wordAdminGET,
  wordAdminPOST,
  deleteWordAdmin,
};
