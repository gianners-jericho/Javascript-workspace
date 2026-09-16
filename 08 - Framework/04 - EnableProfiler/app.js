const express = require("express");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "students-secret",
    resave: false,
    saveUninitialized: false
}));

const PORT = 8888;

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});