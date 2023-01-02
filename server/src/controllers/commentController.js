import ApiError from '../error/ApiError.js';
import { Comment, User } from '../models/models.js';

class CommentController {
  async create(req, res, next) {
    try {
      const { content, videoId } = req.body;
      const comment = await Comment.create({ content, VideoId: videoId, UserId: req.token.id });
      if (!comment) return next(ApiError.badRequest('Bad request'));
      return res.status(200).json(comment);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
  async getOne(req, res) {}
  async getAll(req, res, next) {
    try {
      const { videoId } = req.query;
      const comments = await Comment.findAll({
        where: { VideoId: videoId },
        include: {
          model: User,
          attributes: ['image', 'name', 'id'],
        },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
}

export default new CommentController();
