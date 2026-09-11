import pool from '../config.js';

export class UserModel {
    static async findAll(){
        const query = `
            SELECT * FROM users ORDER BY id DESC;
        `;

        const [rows] = await pool.execute(query); //returns rows and fields, we array destructure rows
        return rows;
    }

    static async findOne(id){
        const query = `
            SELECT * FROM users WHERE id = ?
        `;

        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    //object destructure args so order doesn't matter (better than regular positional args)
    static async create({firstName, lastName, location, favoriteLanguage, comment}){
        const query = `
            INSERT INTO users (first_name, last_name, location, favorite_language, comment)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            firstName.trim(),
            lastName.trim(),
            location.trim(),
            favoriteLanguage.trim(),
            comment? comment.trim() : null,
        ]

        const [result] = await pool.execute(query, values);
        return result.insertId;
    }
}

export default UserModel;

