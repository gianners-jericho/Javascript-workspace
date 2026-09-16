const Cars = require('../models/carsModel');

class CarsController {
    async viewCars(request, response) {
        //check if first time visit
        if (request.session.visit === undefined ) {
            request.session.visit = 0;
        }

        request.session.visit += 1;

        const cars = await Cars.getAll();

        response.render('index', {visits: request.session.visit, cars: cars});
    }

    reserVisit (request, response) {
        request.session.visit = 0;

        response.redirect("/");
    }
}

module.exports = new CarsController();