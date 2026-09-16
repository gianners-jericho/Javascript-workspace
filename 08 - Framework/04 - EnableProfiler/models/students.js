const Model = require("./Model");

class StudentsModel extends Model{
    
    // For finding students using their email 
    async findByEmail(email) {
        const sql = `SELECT * FROM students WHERE email = ?`;

        const results = await this.query(sql, [email]);

        // Returns only one result because results gives back an array of rows
        return results[0];
    }

    // For registering students into the database
    async registerStudent(firstName, lastName, email, password) {
        const sql = `
            INSERT INTO students (first_name, last_name, email, password)
            VALUES (?, ?, ?, ?)`;
    
        const results = await this.query(sql, [firstName, lastName, email, password]);

        return results;
    }

    // For finding students by their id, useful for sessioning
    async findById(id) {
        const sql = `SELECT * FROM students WHERE id = ?`;

        const results = await this.query(sql, [id]);

        // Returns only one result because results gives back an array of rows
        return results[0];
    }
     
}

module.exports = StudentsModel;