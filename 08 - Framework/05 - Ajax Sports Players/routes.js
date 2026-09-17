//import express router and player controller
import { Router } from 'express';
import PlayerController from './controllers/playerController.js';

const router = Router();

//render search page
router.get('/', PlayerController.renderIndex);

//ajax search endpoint supporting both get and post requests
router.get('/players/search', PlayerController.search);
router.post('/players/search', PlayerController.search);

export default router;
