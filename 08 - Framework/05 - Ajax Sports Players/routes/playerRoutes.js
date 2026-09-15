import express from 'express';
import { searchPlayers } from '../controllers/playersController.js';

const router = express.Router();

router.get('/', searchPlayers);
router.get('/search', searchPlayers);

export default router;