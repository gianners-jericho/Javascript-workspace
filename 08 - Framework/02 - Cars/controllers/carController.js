import CarModel from '../models/carModel.js';

export class CarController {
    static async renderIndex(req, res, next){
        try{
            if(!req.session.views){
                req.session.views = 1;
            }
            else{
                req.session.views += 1;
            }
            const cars = await CarModel.findAll();
            res.render("index", {cars, views: req.session.views});
        }catch(error){  
            next(error);
        }
    }
}

export default CarController;