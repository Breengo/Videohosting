import Router from 'express';
import UserController from '../controllers/userController.js';

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', UserController.auth);
router.get('/channel_details', UserController.getDetails);

export default router;
