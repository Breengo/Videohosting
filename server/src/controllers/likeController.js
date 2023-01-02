import ApiError from '../error/ApiError.js';
import { Like } from '../models/models.js';

class LikeController {
  async create(req, res, next) {
    try {
      const { value, videoId } = req.query;
      const alreadyLiked = await Like.findOne({
        where: { VideoId: videoId, UserId: req.token.id },
      });
      if (alreadyLiked) {
        const like = await Like.update(
          { value },
          { where: { VideoId: videoId, UserId: req.token.id } },
        );
        return res.status(200).json({ message: value });
      }
      const like = await Like.create({ value, VideoId: videoId, UserId: req.token.id });
      return res.status(200).json({ message: value });
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
  async getOne(req, res, next) {
    try {
      const { videoId } = req.query;
      const like = await Like.findOne({ where: { VideoId: videoId, UserId: req.token.id } });
      if (like) return res.status(200).json({ message: like.value });
      return res.status(200).json({ message: null });
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
  async getAll(req, res) {
    const { VideoId } = req.query;
    const likes = await Like.findAndCountAll({ where: { VideoId, value: 'like' } });
    const dislikes = await Like.findAndCountAll({ where: { VideoId, value: 'dislike' } });
    return res.status(200).json({ likes: likes.count, dislikes: dislikes.count });
  }
}

export default new LikeController();
