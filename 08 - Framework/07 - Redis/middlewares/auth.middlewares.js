function requireLogin(req, res, next) {
    console.log("Middleware", req.session);
    if(!req.session) return res.redirect('/login');
    next();
}

module.exports = requireLogin;