const fs = require("fs/promises");
const path = require("path");

async function loadPosts() {
  let dataPost = await fs.readFile(
    path.join(process.cwd(), "src", "database", "post.json"),
    "utf-8"
  );
  return dataPost ? JSON.parse(dataPost) : [];
}

const indexView = async (req, res) => {
  let { search } = req.query;

  let posts = await loadPosts();
  let postArray = [];
  let searchQuery = "";
  if (search) {
    searchQuery = search;
    for (const item of posts) {
      if (
        item["title"].includes(search) ||
        item["description"].includes(search)
      ) {
        postArray.push(item);
        console.log("12");
      }
    }
    if (postArray.length != 1) {
      return res.render("pages/client/404", {
        layout: "layout/client_layout",
        dataPost: postArray,
        searchQuery,
      });
    }
  } else {
    return res.render("pages/client/title", {
      layout: "layout/client_layout",
      dataPost: postArray,
      searchQuery,
    });
  }
  if (req.url != "/") {
    return res.render("pages/client/index", {
      layout: "layout/client_layout",
      dataPost: postArray,
      searchQuery,
    });
  } else {
    return res.render("pages/client/title", {
      layout: "layout/client_layout",
      dataPost: postArray,
      searchQuery,
    });
  }
};

const wordGET = async (req, res) => {
  res.render("pages/client/add");

}
const wordPOST = async (req, res) => {
  return res.render('pages/client/add', { ok: false, message: "", method: 'GET' })
}

const postView = async (req, res) => {
  const { id } = req.params
  let searchQuery = "";
  if (id) {
    let posts = await loadPosts();
    let post = posts.find((el) => el["id"] == id);
    return res.render("pages/client/post", {
      layout: "layout/client_layout",
      data: post ? post : {},
      searchQuery,
    });
  }

  return res.render("pages/client/post", {
    layout: "layout/client_layout",
    data: {},
    searchQuery,
  });
};

module.exports = {
  indexView,
  postView,
  wordGET,
  wordPOST
};
