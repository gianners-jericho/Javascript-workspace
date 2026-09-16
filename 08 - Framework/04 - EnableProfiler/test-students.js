const StudentsModel = require("./models/students");

async function test() {
    const studentsModel = new StudentsModel();

    // Uncomment any of these to test the individual functions of the students model
    // const student = await studentsModel.findByEmail("jj@gmail.com");
    // const student = await studentsModel.findById(2);
    // const student = await studentsModel.registerStudent("Test", "Student", "ts@gmail.com", "root");

    console.log(student);
}

test();