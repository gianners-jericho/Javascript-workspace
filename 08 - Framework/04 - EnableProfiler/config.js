import mysql from "mysql2/promise";

//load .env
process.loadEnvFile();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cars_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

//db connection test util
export async function testConnection(){
    try {
        const connection = await pool.getConnection();
        console.log(`DB connected successfully to ${process.env.DB_NAME}`);
        connection.release();
    } catch (error){
        console.error(`ERROR could not connect to DB: ${error}`);
        process.exit(1);
    }
}

export default pool;
