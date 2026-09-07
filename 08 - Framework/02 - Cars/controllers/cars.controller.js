const carModel = require('../models/cars.model')

class CarController {
    async home(req, res) {
        req.session.visit_count ? req.session.visit_count += 1 : req.session.visit_count = 1
        
        const cars = await carModel.findAll();
        
        const data = {
            visit_count: req.session.visit_count,
            cars: cars
        }

        console.log(data)
    
        res.render('home', {data: data})
    }
}

module.exports = new CarController;