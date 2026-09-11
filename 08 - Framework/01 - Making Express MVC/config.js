import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mvc_framework',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

//test DB connectivity on app startup
export async function testConnection(){
    try{
        const connection = await pool.getConnection();
        console.log('CONNECTED SUCCESSFULLY');
    }
    catch(e){
        console.log(`DB CONNECT ERROR: ${e}`)
        process.exit(1);
    }
}

export default pool;