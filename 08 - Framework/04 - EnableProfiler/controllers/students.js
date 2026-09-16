const bcrypt = require("bcrypt");
const StudentsModel = require("../models/students");

const studentsModel = new StudentsModel();

class StudentsController {
  static index(req, res) {
    const error = req.query.error;
    const message = req.query.message;

    res.render("index", {
      error: error,
      message: message
    });
  }

  static async register(req, res) {
    const { first_name, last_name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await studentsModel.registerStudent(
        first_name,
        last_name,
        email,
        hashedPassword,
      );

      return res.redirect("/?message=Registration+successful");
    } catch (error) {
      console.log(`Registration failed: ${error}`);

      return res.redirect("/?error=Registration+failed");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Find the student using their email
      const student = await studentsModel.findByEmail(email);

      // Student does not exist
      if (!student) {
        return res.redirect("/?error=Invalid+email+or+password");
      }

      // Compare the submitted password with the hashed password
      const passwordMatches = await bcrypt.compare(password, student.password);

      // Password is incorrect
      if (!passwordMatches) {
        return res.redirect("/?error=Invalid+email+or+password");
      }

      // Store the student's ID in the session
      req.session.studentId = student.id;

      // Login successful return
      res.redirect("/students/profile");
    } catch (error) {
      console.log(`Login failed: ${error}`);
      return res.redirect("/?error=Login+failed");
    }
  }

  // Display the student's profile
  static async profile(req, res) {
    try {
      // Get the student ID from the session
      const studentId = req.session.studentId;
      // Find the student
      const student = await studentsModel.findById(studentId);
      // Student was not found
      if (!student) {
        req.session.destroy(function () {
          return res.redirect("/");
        });
        return;
      }
      // Display the profile
      return res.render("profile", { student: student });
    } catch (error) {
      console.log(`Profile failed: ${error}`);
      return res.redirect("/");
    }
  }

  // Log out the student
  static logout(req, res) {
    req.session.destroy(function (error) {
      if (error) {
        console.log(`Logout failed: ${error}`);
        return res.redirect("/students/profile");
      }
      return res.redirect("/");
    });
  }
}

module.exports = StudentsController;
