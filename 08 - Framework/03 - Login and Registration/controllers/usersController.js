const User = require('../models/usersModel');
const UserValidator = require('../validators/usersValidator');
const bcrypt = require('bcryptjs');

class UsersController {
    // GET: show login and register view
    viewLoginRegister(request, response) {
        response.render('index');
    }

    //GET: show welcome page
    viewWelcomePage(request, response) {
        response.render('welcome', {user: request.session.user});
    }

    // POST: register a new user
    async register(request, response) {
        const data = request.body;

        //VALIDATE the data from user
        const results = UserValidator.validateRegister(data);

        // Check if there are errors
        if(results.length > 0) {
            return response.render('index', {errors: results})
        }

        // Check if email is already registered
        const isEmail = User.findEmail(data.email);
        if(!isEmail) {
            response.render('index', {error: 'Email already registered!'})
        }

        const hash_password = bcrypt.hashSync(data.password, 10);

        const user = await User.create(data.email, data.first_name, data.last_name, hash_password);

        //set the users detail to session
        request.session.user = {
            id: user.id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        }

        response.redirect('/students/profile');
    }

    async login(request, response) {
        const data = request.body;

        // Validate the users email and password
        const results = UserValidator.validateLogin(data);

        // Check if there are errors
        if(results.length > 0) {
            return response.render('index', {errors: results})
        }

        const user = await User.login(data.email);

        if (!user || !bcrypt.compareSync(data.password, user.hash_password)) {
            return response.render('index', {
                error: 'Invalid email or password!'
            });
        }

        request.session.user = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        }
        
        response.redirect('/students/profile');
    }

    // LOG OFF
    logoff(request, response) {
        request.session.destroy(function() {
            response.redirect('/');
        });
    }
}

module.exports = new UsersController();