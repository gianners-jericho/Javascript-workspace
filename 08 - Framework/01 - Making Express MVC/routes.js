import {Router} from 'express';
import UserController from './controllers/userController';

const router = Router();

router.get('/', UserController.renderForm);
router.get('/submit', UserController.handleFormSubmission);
router.get('/results', UserController.renderResults);

export default router;