import Model from "../models/model.js";

class StudentModel extends Model {
    //find a student by email address
    async findByEmail(email) {
        const query = 'SELECT * FROM students where email = ?';
        return await this.fetchOne(query, [email]);
    }

    //Insert a new student into the database
    async createStudent(studentData) {
        const { first_name, last_name, email, password } = studentData;
        const query = 'INSERT INTO students (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        
        const result = await this.execute(query, [first_name, last_name, email, password]);
        return result.insertId; // Returns the newly created student's ID
    }
}

export default new StudentModel();