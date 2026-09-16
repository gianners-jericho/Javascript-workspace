const User = require('../models/user');

class UsersController {

    //GET / - show the login form
    viewLoginPage(request, response) {
        response.render('login', {error: ''});
    }

    //POST /login - ask the model if this email and password exist
    async processLogin(request, response) {
        const email = request.body.email;
        const password = request.body.password;

        try {
            const user = await User.findByLogin(email, password);

            //No row came back, so show the form again with a message
            if (!user) {
                response.render('login', {error: 'Email or password is wrong.'});
                return;
            }

            request.session.user = user;

            response.redirect('/welcome');
        } catch (error) {
            console.log(error.message);
            response.render('login', {error: 'Something went wrong.'});
        }
    }

    //GET /register - show the register form
    viewRegisterPage(request, response) {
        response.render('register', {error: ''});
    }

    //POST /register - save a new user
    async processRegister(request, response) {
        const first_name = request.body.first_name;
        const last_name = request.body.last_name;
        const email = request.body.email;
        const password = request.body.password;

        //Every field is required
        if (!first_name || !last_name || !email || !password) {
            response.render('register', {error: 'Please fill out every field.'});
            return;
        }

        try {
            const taken = await User.findByEmail(email);

            if (taken) {
                response.render('register', {error: 'That email is already registered.'});
                return;
            }

            await User.create(first_name, last_name, email, password);

            response.redirect('/');
        } catch (error) {
            console.log(error.message);
            response.render('register', {error: 'Something went wrong.'});
        }
    }

    //GET /welcome - only for a user that logged in
    viewWelcomePage(request, response) {
        if (!request.session.user) {
            response.redirect('/');
            return;
        }

        response.render('welcome', {user: request.session.user});
    }

    //GET /logoff - throw the session away
    processLogoff(request, response) {
        request.session.destroy(function() {
            response.redirect('/');
        });
    }
}

module.exports = new UsersController();
