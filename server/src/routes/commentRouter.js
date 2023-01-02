import Router from 'express';
import commentController from '../controllers/commentController.js';
import isAuth from '../middlewares/IsAuthMiddleware.js';

const router = new Router();

router.post('/comment', isAuth, commentController.create);
router.post('/comment_details', commentController.getOne);
router.get('/comments', commentController.getAll);

export default router;
