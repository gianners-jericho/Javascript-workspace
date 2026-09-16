const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");

app.use(express.static("assets"));

app.use(routes);

app.listen(PORT, function () {
  console.log(
    `Server is running on port ${PORT} and live at http://localhost:${PORT}`,
  );
});