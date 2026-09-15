const mysql = require('mysql2')
const getProfiler = require('../middlewares/profiler.middleware').getProfiler;

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});

connection.connect(function(err) {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Connected to MySQL");
});

async function query(sql, params = []){
    const profiler = getProfiler();
    const start = process.hrtime.bigint();

    try {

        const result = await connection.promise().query(sql, params);
        const end = process.hrtime.bigint();

        if (profiler) {
            profiler.queries.push({
                sql,
                params,
                duration: Number(end - start) / 1_000_000,
                error: null
            });
        }

        return result;

    } catch (error) {
        const end = process.hrtime.bigint();
        if (profiler) {
            profiler.queries.push({
                sql,
                params,
                duration: Number(end - start) / 1_000_000,
                error: error.message
            });
        }
        throw error;
    }
}

module.exports = {
    query
};