import Router from 'express';

import userRouter from './userRouter.js';
import likeRouter from './likeRouter.js';
import videoRouter from './videoRouter.js';
import commentRouter from './commentRouter.js';
import subsRouter from './subsRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/video', videoRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);
router.use('/subs', subsRouter);

export default router;
