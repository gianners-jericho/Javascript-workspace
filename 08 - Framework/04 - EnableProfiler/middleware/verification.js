const StudentsModel = require("../models/students");

const studentsModel = new StudentsModel();

async function verifyRegistration(req, res, next) {
    const { first_name, last_name, email, password, confirm_password } = req.body;

    // Check required fields
    if ( !first_name || !last_name || !email || !password || !confirm_password ) { 
        return res.redirect("/?error=Please+fill+in+all+fields"); 
    }

    // Check first name 
    if (!/^[A-Za-z]+$/.test(first_name)) {
        return res.redirect("/?error=First+name+must+contain+letters+only"); 
    } 
    
    // Check last name 
    if (!/^[A-Za-z]+$/.test(last_name)) { 
        return res.redirect("/?error=Last+name+must+contain+letters+only"); 
    }

    // Check email format 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
        return res.redirect("/?error=Please+enter+a+valid+email"); 
    } 
    
    // Check password length 
    if (password.length < 8) { 
        return res.redirect("/?error=Password+must+be+at+least+8+characters"); 
    } 
    
    // Check if passwords match 
    if (password !== confirm_password) { 
        return res.redirect("/?error=Passwords+do+not+match"); 
    }

    // Check if email already exists
    try { 
        const student = await studentsModel.findByEmail(email); 
        
        if (student) { 
            return res.redirect("/?error=Email+is+already+registered"); 
        } 
        
        next(); 
    } catch (error) { 
        console.log(`Registration verification failed: ${error}`); 
        return res.redirect("/?error=Something+went+wrong"); 
    }

    // Verify login form 
    function verifyLogin(req, res, next) {
        const {email, password} = req.body;
    }

    // Check required fields 
    if (!email || !password) { 
        return res.redirect("/?error=Please+enter+your+email+and+password"); 
    } 
    
    // Check email format 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
        return res.redirect("/?error=Please+enter+a+valid+email"); 
    } 
    
    next();
}