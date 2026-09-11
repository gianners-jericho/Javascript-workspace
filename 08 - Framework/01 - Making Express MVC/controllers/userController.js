import UserModel from '../models/userModel.js';

export class UserController {

    static renderForm(req, res){
        // .render() args depends on the set view engine, in this case, the 2nd arg contains the objects we want to pass into ejs for data.
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
            
            /*TODO: ADD SERVER SIDE INPUT VALIDATION */
        
            //update DB
            await UserModel.create({firstName, lastName, location, favoriteLanguage, comment: comment || null});    
        
            res.redirect('/results');
        }
        catch(e){
            next(error); //pass to error handlers in middleware (optional)
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