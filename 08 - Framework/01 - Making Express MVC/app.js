const express = require("express");

const app = express();

app.set("view engine", "ejs");

const PORT = 8000;

const routes = require("./routes");

app.use("/", routes);

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});