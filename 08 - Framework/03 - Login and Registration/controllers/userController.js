import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export class UserController {

    static renderLoginForm(req, res){
        res.render('login', {
            formData: {},
            errors: [],
        })
    }

    static renderRegisterForm(req, res){
        res.render('register', {
            formData: {},
            errors: []
        })
    }

    static async handleRegister(req, res, next){
        try{
            const {firstName, lastName, email, password, confirmPassword} = req.body;
            
            //handle input validation
            const errors = [];

            if (!firstName || firstName.trim() === '') errors.push('First name is required.');
            if (!lastName || lastName.trim() === '') errors.push('Last name is required.');
            if (!email || email.trim() === '') {
                errors.push('Email is required.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                errors.push('Please enter a valid email address.');
            }
            if (!password || password.trim() === '') {
                errors.push('Password is required.');
            } else if (password.trim().length < 8) {
                errors.push('Password must be at least 8 characters long.');
            }
            if (!confirmPassword || confirmPassword.trim() === '') errors.push('Password Confirmation is required.');
            if (password && confirmPassword && password.trim() !== confirmPassword.trim()) errors.push ('Password and Confirmed Password must match.');

            if (email && email.trim() !== '') {
                const existingUser = await UserModel.findByEmail(email.trim());
                if (existingUser) errors.push('An account with that email already exists.');
            }
            
            //re-render form with validation errors if there are any
            if(errors.length > 0 ){
                return res.status(422).render('register', {
                    formData: {firstName, lastName, password, confirmPassword, email},
                    errors,
                })
            }

            //update DB
            const userId = await UserModel.create({firstName, lastName, email, password});    

            req.session.user = { id: userId, firstName, lastName, email }; //set user session

            //redirect instead of render, because the browser is still on a POST request, refreshing the page will resubmit the form. `.redirect` redirects the browser to a new url and fires a completely new get request.
            res.redirect('/home'); //redirect also can't have an object in its second arg like render with ejs since it is a get request
        }
        catch(e){
            next(e); //pass to error handlers in middleware (optional)
                     //next(e) will look for error handlers/middleware with 4 params - (err, req, res, next)
                     //next() will just pass to regular middleware (req, res, next)
        }
    }

    static async handleLogin(req, res, next){
        try{
            const {email, password} = req.body;
            const errors = [];

            if (!email || email.trim() === '') errors.push('Email is required.');
            if (!password || password.trim() === '') errors.push('Password is required.');

            if(errors.length > 0){
                return res.status(422).render('login', {
                    formData: {email},
                    errors,
                });
            }

            const user = await UserModel.findByEmail(email.trim());
            const isMatch = user ? await bcrypt.compare(password, user.hashed_password) : false;

            if (!user || !isMatch) errors.push('Incorrect email or password.');
            
            if(errors.length > 0){
                return res.status(422).render('login', {
                    formData: {email},
                    errors,
                });
            }

            req.session.user = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
            };

            res.redirect('/home');
        }
        catch(e){
            next(e);
        }
    }

    static async renderHome(req, res, next){

        // if(!req.session.user){
        //     res.redirect('/login')
        // }
        // else{
        //     res.render('home', { user: req.session.user });
        // }

        //instead of checking sessions in each controller method like above, i put auth middleware logic in /middleware/authMiddleware.js
        res.render('home', { user: req.session.user });
        
    }

    static handleLogout(req, res){
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
}

export default UserController;