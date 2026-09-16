const { userModel, user } = require('../models/users.models')
const cryptoUtils = require('../utils')

class UsersController {
    viewRegister(req, res) {
        res.render('register', { errors: null });
    };

    viewLogin(req, res) {
        res.render('login', { errors: null });
    };

    async postRegister(req, res) {
        const values = req.body;
        const hash = cryptoUtils.hash_password(values.password);

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
            const check = cryptoUtils.verify_hash(existing.password_hash, values.password);
            if(check) {
                req.session.user = {name: existing.name, email: existing.email};
                return res.redirect('/dashboard');
            }
        }

        res.render('login', { error: "Incorrect credentials."});
    };

    postLogoff(req, res) {
        req.session.user = null;
            req.session.save(function (err) {
            if (err) next(err);

            req.session.regenerate(function (err) {
                if (err) next(err);
                res.redirect('/login');
            });
        });
    };
}

module.exports = new UsersController;