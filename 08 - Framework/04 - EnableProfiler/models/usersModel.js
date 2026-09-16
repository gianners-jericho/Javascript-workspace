const Model = require('./model');

class User extends Model {

    //LOGIN: get the user that matches the email and the password
    async findByLogin(email, password) {
        const rows = await this.query(
            `
            SELECT id, first_name, last_name, email
            FROM users
            WHERE email = ? AND password = ?
            LIMIT 1;
            `, [email, password]
        );

        return rows[0];
    }

    //LIST: everybody in the table
    async findAll() {
        return this.query(
            `
            SELECT id, first_name, last_name, email
            FROM users
            ORDER BY first_name;
            `
        );
    }
}

module.exports = new User();
