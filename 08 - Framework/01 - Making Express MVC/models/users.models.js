const db = require('../db')

class User {
    constructor(user_id, email, password_hash, name){
        this.user_id = user_id,
        this.email = email,
        this.password_hash = password_hash,
        this.name = name
    }
}

class UserModel {
    async findAll() {
        const { rows } = await db.promise().query("SELECT * FROM users");
        return rows.map(function(row) {return new User(row)});
    }

    async findByEmailAndPassword(email, hash){
        const { row } = await db.promise().query("SELECT * FROM users WHERE email = ? AND password_hash = ?", [email, hash]);
        return new User(row);
    }
    
    async findById(id){
        const { row } = await db.promise().query("SELECT * FROM users WHERE user_id = ?", [id]);
        return new User(row);
    }

    async findByEmail(email){
        const row = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        return row[0][0];
    }

    async create(email, password_hash, name){
        const { result } = await db.promise().query("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)", [email, password_hash, name]);
        return result;
    }
}

module.exports = {
    user: new User,
    userModel: new UserModel
};