const athleteModel = require('../models/athletes.models');

class AthletesController {

    // App Routes
    viewHome(req, res) {
        res.render('home', { errors: null });
    };

    // API Routes
    async GETAthletes(req, res){
        if(Object.keys(req.query).length > 0){

            const gender = req.query.gender
                ? Array.isArray(req.query.gender)
                    ? req.query.gender
                    : [req.query.gender]
                : [];

            const sports = req.query.sport
                ? Array.isArray(req.query.sport)
                    ? req.query.sport
                    : [req.query.sport]
                : [];

            const result = await athleteModel.findFilter(gender, sports, req.query.name)
            return res.status(200).json(result);
        }
        else {
            const result = await athleteModel.findAll();
            console.log(result)
            return res.status(200).json(result);
        }
    }
}

module.exports = new AthletesController;