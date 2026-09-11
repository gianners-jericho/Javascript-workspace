const express = require("express");

const app = express();

app.set("view engine", "ejs");

PORT = 8000;

app.use(express.static(__dirname + "/static"));

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});