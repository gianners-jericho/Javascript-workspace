const userModel = require('../models/users.model');
const cryptoUtils = require('../utils')

class UserController {

    viewRegister(req, res){
        res.render('register');
    }

    viewLogin(req, res){
        res.render('login');
    }

    async postRegister(req, res) {
        console.log(req.body)
        const values = req.body;
        
        const hash = cryptoUtils.hash_password(values.password);
        console.log(hash)
        if(await userModel.create(values.name, values.email, hash)){
            res.redirect('/login');
        }
        else {
            res.render('register');
        }
    };

    async postLogin(req, res) {
        const values = req.body;
        const existing = await userModel.findByEmail(values.email);
        if(existing) {
            const check = cryptoUtils.verify_hash(existing.password_hash, values.password)
            if(check) {
                req.session.user = {user_id: existing.user_id, name: existing.name, email: existing.email, isAdmin: existing.isAdmin > 0 ? true : false};
                return res.redirect('/');
            }
        }

        res.render('login', { error: "Incorrect credentials."});
    }
}

module.exports = new UserController;