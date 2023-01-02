import Router from 'express';
import VideoController from '../controllers/videoController.js';
import isAuth from '../middlewares/IsAuthMiddleware.js';

const router = new Router();

router.post('/upload', isAuth, VideoController.create);
router.post('/find_video', VideoController.getBySearch);
router.get('/video_details', VideoController.getOne);
router.get('/videos', VideoController.getAll);
router.get('/subscription_videos', isAuth, VideoController.getSubscriptionVideos);
router.get('/liked_videos/', isAuth, VideoController.getLikedVideos);

export default router;
