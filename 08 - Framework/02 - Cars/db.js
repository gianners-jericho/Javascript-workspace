const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Connected to MySQL");
});

module.exports = connection;