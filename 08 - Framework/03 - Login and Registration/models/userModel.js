import pool from '../config.js';
import bcrypt from 'bcrypt';

export class UserModel {
    static async findAll(){
        const query = `
            SELECT 
                id, 
                first_name, 
                last_name,
                email,
                created_at 
            FROM users 
            ORDER BY created_at DESC;
        `;

        const [rows] = await pool.execute(query); //returns rows and fields, we array destructure rows
        return rows;
    }

    static async findById(id){
        const query = `
            SELECT 
                id, 
                first_name, 
                last_name, 
                email,
                hashed_password,
                created_at 
            FROM users 
            WHERE id = ?;
        `;

        const [rows] = await pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async findByEmail(email){
        const query = `
            SELECT
                id,
                first_name,
                last_name,
                email,
                hashed_password,
                created_at
            FROM users
            WHERE email = ?;
        `

        const [rows] = await pool.execute(query, [email]);
        return rows.length > 0? rows[0] : null;
    }

    //object destructure args so order doesn't matter (better than regular positional args)
    static async create({firstName, lastName, email, password}){

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (first_name, last_name, email, hashed_password)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            firstName.trim(),
            lastName.trim(),
            email.trim(),
            hashedPassword,
        ];

        const [result] = await pool.execute(query, values);
        return result.insertId;
    }
}

export default UserModel;
