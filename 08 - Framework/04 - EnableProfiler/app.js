const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 8888;

const routes = require("./routes");
const profiler = require("./middleware/profiler");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "students-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(profiler);
app.use(routes);

app.listen(PORT, function () {
  console.log(
    `Server is running on port ${PORT} and live at http://localhost:${PORT}`,
  );
});