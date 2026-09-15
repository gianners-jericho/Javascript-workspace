import Model from "../models/model.js";

class StudentModel extends Model {
    async findById(id, profiler = null) {
        const query = 'SELECT id, first_name, last_name, email, created_at FROM students WHERE id = ?';
        return await this.fetchOne(query, [id], profiler);
    }

    //find a student by email address
    async findByEmail(email, profiler = null) {
        const query = 'SELECT * FROM students where email = ?';
        return await this.fetchOne(query, [email], profiler);
    }

    //Insert a new student into the database
    async createStudent(studentData, profiler = null) {
        const { first_name, last_name, email, password } = studentData;
        const query = 'INSERT INTO students (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        
        const result = await this.execute(query, [first_name, last_name, email, password], profiler);
        return result.insertId; // Returns the newly created student's ID
    }
}

export default new StudentModel();