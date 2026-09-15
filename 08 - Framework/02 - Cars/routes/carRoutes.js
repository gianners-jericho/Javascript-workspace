import express from 'express';
import { index, resetVisits } from '../controllers/carController.js';

const router = express.Router();

router.get('/', index);
router.post('/reset', resetVisits); // Form POST for the reset button

export default router;