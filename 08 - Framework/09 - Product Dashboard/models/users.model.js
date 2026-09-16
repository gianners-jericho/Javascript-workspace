const db = require('../db')

class UserModel {
    async create(name, email, hash, isAdmin = 0){
        const result = await db.promise().query("INSERT INTO users (name, email, password_hash, isAdmin) VALUES (?, ?, ?, ?)", [name, email, hash, isAdmin])
        return result ? true : false;
    }

    async findByEmail(email){
        const row = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        return row[0][0];
    }

    async findAll() {
        const { rows } = await db.query("SELECT * FROM users");
        return rows.map(function(row) {return new User(row)});
    }
}

module.exports = new UserModel;