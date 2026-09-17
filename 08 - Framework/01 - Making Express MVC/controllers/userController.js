import UserModel from '../models/userModel.js';

class UserController {

    static renderForm(req, res){
        //.render() args depends on the set view engine, in this case, the 2nd arg contains the objects we want to pass into ejs for data.
        res.render('index',{
            title: 'Survey Form',
            formData:{},
            errors: [],
        } 
        );
    }

    static async handleFormSubmission(req, res, next){
        try{
            const {firstName, lastName, location, favoriteLanguage, comment} = req.body;
            
            //handle input validation
            const errors = [];

            if (!firstName || firstName.trim() === '') errors.push('First name is required.');
            if (!lastName || lastName.trim() === '') errors.push('Last name is required.');
            if (!location || location.trim() === '') errors.push('Location is required.');
            if (!favoriteLanguage || favoriteLanguage.trim() === '') errors.push('Favorite language is required.');
            
            //re-render form with validation errors if there are any
            if(errors.length > 0 ){
                return res.status(422).render('index', {
                    title: 'Survey Form',
                    formData: {firstName, lastName, location, favoriteLanguage, comment},
                    errors,
                })
            }

            //update DB
            await UserModel.create({firstName, lastName, location, favoriteLanguage, comment: comment || null});    

            res.redirect('/results');
        }
        catch(e){
            next(e); //pass to error handlers in middleware (optional)
                     //next(e) will look for error handlers/middleware with 4 params - (err, req, res, next)
                     //next() will just pass to regular middleware (req, res, next)
        }
    }

    static async renderResults(req, res, next){
        try{
            const submissions = await UserModel.findAll();

            res.render('results', {title: 'Results', submissions});
        }
        catch(e){
            next(e);
        }
    }
}

export default UserController;