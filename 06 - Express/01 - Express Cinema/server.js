const express = require('express');
const app = express();

// Express static middleware: everything inside /static is served as-is.
// No routes, no view engine, no views directory needed for this assignment.
app.use(express.static(__dirname + "/static"));

//SERVER PORT
app.listen(8000, function () {
    console.log("Listening to port 8000"); 
});
