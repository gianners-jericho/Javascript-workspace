const database = require('./model');

class User {
    //LOGIN: find and get the user details of the matching email
    async login(email) {
        const rows = await database.query(
            `
            SELECT id, email, first_name, last_name, hash_password
            FROM users
            WHERE email = ?;
            `, [email]
        );

        return rows[0];
    }

    //VALIDATE: find and get the user with the matching email.
    async findEmail(email) {
        const rows = await database.query(
            `
            SELECT email FROM users WHERE email = ?
            `, [email]
        );

        return rows;
    }

    //REGISTER: add new user
    async create(email, first_name, last_name, hash_password) {
        return database.query(
            `
            INSERT INTO users (email, first_name, last_name, hash_password)
            VALUES (?, ?, ?, ?)
            `, [email, first_name, last_name, hash_password]
        );
    }
}

module.exports = new User();