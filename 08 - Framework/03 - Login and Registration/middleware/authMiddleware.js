export function requireAuth(req, res, next){
    if(!req.session.user){
        return res.redirect('/login');
    }

    next(); //pass to the next controller/middleware as defined in routes.js
            //example: router.get('/home', requireAuth, UserController.renderHome); next() in requireAuth passes to renderHome
}