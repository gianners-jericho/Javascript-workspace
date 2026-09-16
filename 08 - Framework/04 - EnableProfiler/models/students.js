const Model = require("./Model");

class StudentsModel extends Model{
    
    // For finding students using their email 
    async findByEmail(email) {
        const sql = `SELECT * FROM students WHERE email = ?`;

        const results = await this.query(sql, [email]);

        // Returns only one result because results gives back an array of rows
        return results[0];
    }

    
}

module.exports = StudentsModel;