import Router from 'express';
import subsController from '../controllers/subsController.js';
import isAuth from '../middlewares/IsAuthMiddleware.js';

const router = new Router();

router.get('/subscribe', isAuth, subsController.create);
router.get('/subscribers', subsController.getAllSubscribers);
router.get('/subscribes', isAuth, subsController.getAllSubscribes);
router.get('/isSubscribed', isAuth, subsController.getOne);

export default router;
