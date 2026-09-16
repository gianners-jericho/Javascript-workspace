function authentication(request, response, next) {
    if (!request.session.user) {
        return response.redirect('/');
    }

    next();
}

module.exports = authentication;
