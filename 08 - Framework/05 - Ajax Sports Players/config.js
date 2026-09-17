//import mysql2 promise wrapper
import mysql from 'mysql2/promise';

//load environment variables from .env
process.loadEnvFile();

//create database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sports_players_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

//test database connection on server start
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log(`[Database] connected successfully to ${process.env.DB_NAME}`);
        connection.release();
    } catch (error) {
        console.error(`[Database Error] could not connect: ${error}`);
        process.exit(1);
    }
}

export default pool;
