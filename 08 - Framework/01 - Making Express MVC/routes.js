import { Router } from 'express';
import UserController from './controllers/userController.js';

const router = Router();

//display survey form
router.get('/', UserController.renderForm);

//handle survey submission
router.post('/submit', UserController.handleFormSubmission);

//view survey submissions list
router.get('/results', UserController.renderResults);

export default router;