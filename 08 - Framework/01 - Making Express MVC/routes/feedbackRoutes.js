import express from 'express';
import { renderForm, processFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// Route to display the feedback form
router.get('/', renderForm);

// Route to handle form submission
router.post('/result', processFeedback);

export default router;