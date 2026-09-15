const sportsModel = require('../models/sports.models')

class SportsController {

    // API Routes

    async GETSports(req, res){
        const result = await sportsModel.findAll();
        return res.status(200).json(result);
    }
}

module.exports = new SportsController;