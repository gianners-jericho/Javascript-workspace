import Controller from './controller.js';
import CarModel from '../models/carModel.js';

export class CarController extends Controller {
    //renders car listing page with profiler enabled
    static renderIndex = async (req, res, next) => {
        try {
            //enable the profiler from this controller
            const shouldProfile = req.query.profiler !== '0';
            this.enableProfiler(res, shouldProfile);

            //update session view counter
            if (!req.session.views) {
                req.session.views = 1;
            } else {
                req.session.views += 1;
            }

            //execute database query
            const cars = await CarModel.findAll();

            res.render("index", {
                cars,
                views: req.session.views,
                message: null
            });
        } catch (error) {
            next(error);
        }
    };

    //handles post form submission to demonstrate post variables and insert queries in profiler
    static createCar = async (req, res, next) => {
        try {
            //enable the profiler from this controller
            this.enableProfiler(res, true);

            const { name, year } = req.body;
            let message = null;

            if (name && year) {
                //execute insert query
                await CarModel.create({
                    name: name.trim(),
                    year: parseInt(year, 10)
                });
                message = `Successfully added "${name.trim()}" (${year}) to the database!`;
            } else {
                message = 'Car name and year are required.';
            }

            //update session counter
            if (!req.session.views) {
                req.session.views = 1;
            } else {
                req.session.views += 1;
            }

            //execute select query to fetch updated list
            const cars = await CarModel.findAll();

            //render view directly on post to inspect post variables and executed queries in profiler
            res.render("index", {
                cars,
                views: req.session.views,
                message
            });
        } catch (error) {
            next(error);
        }
    };
}

export default CarController;