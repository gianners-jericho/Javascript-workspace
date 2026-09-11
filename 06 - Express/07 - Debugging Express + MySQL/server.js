require('dotenv').config(); // Load environment variables at the top

var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname + "/static" ));
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

/** MYSQL Connection **/
const Mysql = require('mysql2');
var connection = Mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected successfully!");
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

/** Basic Execute Query function **/
function executeQuery(query) {
    return new Promise(function(resolve, reject) {
        connection.query(query, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });	
    });

}

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/login", async function(req,res) {
    let email = req.body['email'];
    let password = req.body['password'];

    let get_user_query 		= Mysql.format(`
        SELECT users.id, users.first_name, users.email, users.password
        FROM users
        WHERE users.email = ? AND users.password = ? LIMIT 1;`, [email, password]
    );

    /** 
     * Using callback, async/await, and promises,
     * find a way so that you can console.log
     * the result variable here instead of doing the console.log
     * in the connection.query() function.
     * Make sure after making the changes, that the res.redirect('/') still works.
    **/

    /** 
     * When you try this out now, you should see that the ordering of processes are off.
     * It reads STEP 1 first, then skips to STEP 3, then back to STEP 2. Why is that?
     * Please fix the ordering to Step 1, Step 2, & Step 3.
     * Make sure you solve this using: Callback, Async/Await, and Promises.
    **/    

    console.log("STEP 1");
    let result = await executeQuery(get_user_query);
    console.log("STEP 2: ", result);
    console.log("STEP 3");
    
    res.redirect('/');
});

app.listen(8000, function(){
    console.log("Listening on port: 8000");
});