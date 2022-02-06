const express = require("express");
const path = require("path");
const app = express();

// view engien begin
app.set("layout", "layout/main_layout");
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
// view engien end

// middleware begin
const middleware = require("./middlewares/index");
app.use(middleware);
// middleware end

// routes begin
const routes = require("./routes/index");
app.use(routes);
// routes end

app.listen(4000, () => console.log("Server is running 4000"));
