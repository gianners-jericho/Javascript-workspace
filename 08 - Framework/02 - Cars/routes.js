import {Router} from 'express';
import CarController from './controllers/carController.js';

const router = Router();

router.get(["/", "/index"], CarController.renderIndex);

export default router;