const StudentsModel = require("../models/students");
const bcrypt = require("bcrypt");

class StudentsController {
    static index(req, res) {
        res.render("index");
    }

    static register(req, res) {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirm_password;

        // Check if any field is empty
        if  (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.send("Please complete all fields".);
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

        // Check password
        if (password.length < 8) { return res.send("Password must be at least 8 characters long."); } 
        
        // Check if passwords match 
        if (password !== confirmPassword) { 
            return res.send("Passwords do not match."); 
        }

        

    }
    
    static profile(req, res) {
        res.render("profile");
    }
}

module.exports = StudentsController;