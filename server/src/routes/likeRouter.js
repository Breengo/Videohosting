import Router from 'express';
import likeController from '../controllers/likeController.js';
import isAuth from '../middlewares/IsAuthMiddleware.js';

const router = new Router();

router.get('/like', isAuth, likeController.create);
router.get('/like_info', isAuth, likeController.getOne);
router.get('/likes', likeController.getAll);

export default router;
