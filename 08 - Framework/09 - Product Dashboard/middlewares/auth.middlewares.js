function requireLogin(req, res, next) {
    if(!req.session || !req.session.user) return res.status(401).redirect('/login');
    next();
}

function requireAdmin(req, res, next) {
    if(!req.session || !req.session.user || !req.session.user.isAdmin) {
        console.log('403')
        return res.status(403).redirect('/login')
    };
    next();
}

module.exports = {requireLogin, requireAdmin};