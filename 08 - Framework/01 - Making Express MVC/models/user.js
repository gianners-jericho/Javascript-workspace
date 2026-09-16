const database = require('./database');

//Every query about the users table belongs here, never in the controller
//Note: the course data keeps plain passwords, a real app would hash them with bcrypt
class User {

    //Find the one user that matches the email and the password
    async findByLogin(email, password) {
        const rows = await database.query(`
            SELECT id, first_name, last_name, email
            FROM users
            WHERE email = ? AND password = ? LIMIT 1;`, [email, password]
        );

        return rows[0];
    }

    //Used to block an email that is already taken
    async findByEmail(email) {
        const rows = await database.query(`
            SELECT id FROM users WHERE email = ? LIMIT 1;`, [email]
        );

        return rows[0];
    }

    //Add a new row to the users table
    create(first_name, last_name, email, password) {
        return database.query(`
            INSERT INTO users (first_name, last_name, email, password)
            VALUES (?, ?, ?, ?);`, [first_name, last_name, email, password]
        );
    }
}

module.exports = new User();
