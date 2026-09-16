const User = require('../models/usersModel');

class UsersController {

    //GET: show the login form
    viewLoginPage(request, response) {
        response.render('login', {error: ''});
    }

    //POST: check the email and password against the database
    async login(request, response) {
        const data = request.body;

        try {
            const user = await User.findByLogin(data.email, data.password);

            //No row came back, so show the form again with a message
            if (!user) {
                return response.render('login', {error: 'Email or password is wrong.'});
            }

            request.session.user = user;

            response.redirect('/users');
        } catch (error) {
            console.log(error.message);
            response.render('login', {error: 'Something went wrong.'});
        }
    }

    //GET: the user list, only for someone who logged in
    async viewUserList(request, response) {
        try {
            const users = await User.findAll();

            response.render('users', {users: users});
        } catch (error) {
            console.log(error.message);
            response.redirect('/');
        }
    }

    //LOG OFF
    logoff(request, response) {
        request.session.destroy(function() {
            response.redirect('/');
        });
    }
}

module.exports = new UsersController();
