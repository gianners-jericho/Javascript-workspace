const StudentsModel = require("../models/students");
const bcrypt = require("bcrypt");

class StudentsController {

    // Show the main page
    static index(req, res) {

        const message = req.session.message;

        req.session.message = null;

        res.render("index", {
            message: message
        });
    }

    // Register a new student
    static register(req, res) {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirm_password;

        // Input validation
        // Check if any field is empty
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            console.log("Check 1");
            return res.send("Please complete all fields.");
        }

        // Check first name
        if (!/^[A-Za-z]+$/.test(firstName)) {
            return res.send("First name must contain letters only.");
        }

        // Check last name
        if (!/^[A-Za-z]+$/.test(lastName)) {
            return res.send("Last name must contain letters only.");
        }

        // Check email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.send("Please enter a valid email address.");
        }

        // Check password length
        if (password.length < 8) {
            return res.send("Password must be at least 8 characters long.");
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.send("Passwords do not match.");
        }

        // Connect to the database through the child StudentsModel
        const studentModel = new StudentsModel();

        // Check if email already exists
        studentModel.findByEmail(email, function(error, student) {

            if (error) {
                console.log(error);
                return res.status(500).send("Database error.");
            }

            // Email already exists
            if (student) {
                return res.send("Email is already registered.");
            }

            // Hash password with bcrypt
            bcrypt.hash(password, 10, function(error, hashedPassword) {

                if (error) {
                    console.log(error);
                    return res.status(500).send("Password hashing error.");
                }

                // Register Student
                studentModel.registerStudent(
                    firstName,
                    lastName,
                    email,
                    hashedPassword,
                    function(error, result) {

                        if (error) {
                            console.log(error);
                            return res.status(500).send("Database error.");
                        }

                        // Registration successful
                        req.session.message = "Registration Successful!";
                        res.redirect("/");
                    }
                );
            });
        });
    }

    // Log in an existing student
    static login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        // Input Validation
        // Check if fields are empty
        if (!email || !password) {
            return res.send("Please enter your email and password.");
        }

        // Check email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.send("Please enter a valid email address.");
        }

        // Find student
        const studentModel = new StudentsModel();

        studentModel.findByEmail(email, function(error, student) {

            if (error) {
                console.log(error);
                return res.status(500).send("Database error.");
            }

            // Student doesn't exist
            if (!student) {
                return res.send("Invalid email or password.");
            }

            // Check password
            bcrypt.compare(
                password,
                student.password,
                function(error, passwordMatches) {

                    if (error) {
                        console.log(error);
                        return res.status(500).send("Password comparison error.");
                    }

                    // Password is incorrect
                    if (!passwordMatches) {
                        return res.send("Invalid email or password.");
                    }

                    // Create session
                    req.session.studentId = student.id;

                    // Login successful
                    res.redirect("/students/profile");
                }
            );
        });
    }

    // Show the student's profile
    static profile(req, res) {

        // Check if the student is logged in
        if (!req.session.studentId) {
            return res.redirect("/");
        }

        const studentModel = new StudentsModel();

        studentModel.findById(
            req.session.studentId,
            function(error, student) {

                if (error) {
                    console.log(error);
                    return res.status(500).send("Database error.");
                }

                if (!student) {
                    return res.redirect("/");
                }

                res.render("profile", {
                    student: student
                });
            }
        );
    }

    // Log out the student
    static logout(req, res) {

        // Destroy session
        req.session.destroy(function(error) {

            if (error) {
                console.log(error);
                return res.status(500).send("Logout failed.");
            }

            res.redirect("/");
        });
    }
}

module.exports = StudentsController;