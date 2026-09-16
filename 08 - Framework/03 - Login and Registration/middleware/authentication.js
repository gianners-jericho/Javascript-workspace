// Middleware: checks if the user is logged in.
function authentication(request, response, next) {
    if (!request.session.user) {
        return response.redirect('/');
    }

    next();
}

module.exports = authentication;