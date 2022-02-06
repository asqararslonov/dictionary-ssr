const fs = require("fs/promises");
const path = require("path");

async function wordGET(word, description) {
  if (word && description) {
    let words = await loadWord(
      path.join(process.cwd(), "src", "database", "post.json")
    );
    let newWords = await loadWord(
      path.join(process.cwd(), "src", "database", "new.json")
    );
    let $word = newWords.find((el) => el["title"] == word);
    let desc = newWords.find((el) => el["description"] == description);
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
  let words = await loadWord(path.join(process.cwd(), "src", "database", "new.json"));
  let realWords = await loadWord(path.join(process.cwd(), "src", "database", "post.json"));

  console.log(id);
  let userDB = words.filter((el) => el["id"] == id); // filtered from database from users
  let adminDB = realWords.filter((el) => el["id"] == id); // filtered from database from users
  process.setMaxListeners(0);
  var index = data.findIndex(function(item, i){
    return item.name === val
  });

  console.log(userDB[0]["title"])
    const newWord = {
        id: realWords.length ? realWords[realWords.length - 1].id + 1 : 1,
        title:  userDB[0]["title"],
        description: userDB[0]["description"]
    }
  realWords.push(newWord);

  await fs.writeFile(
      path.join(process.cwd(), "src", "database", "post.json"),
      JSON.stringify(realWords, null, 4)
  );
  res.redirect("/admin/words");
};

module.exports = { wordAddPOST, addWordAdmin };
