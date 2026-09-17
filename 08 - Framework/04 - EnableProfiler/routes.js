import { Router } from 'express';
import CarController from './controllers/carController.js';

const router = Router();

//get routes
router.get(['/', '/index'], CarController.renderIndex);

//post route for testing post data and insert database queries in profiler
router.post('/cars', CarController.createCar);

export default router;