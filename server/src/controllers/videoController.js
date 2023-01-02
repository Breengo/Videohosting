import { Like, Subscribes, User, Video } from '../models/models.js';
import { fileURLToPath } from 'url';
import { Op } from 'sequelize';
import path from 'path';
import { v4 } from 'uuid';
import ApiError from '../error/ApiError.js';

class VideoController {
  async create(req, res, next) {
    try {
      const UserId = req.token.id;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const { title, description } = req.body;
      const { file } = req.files;
      if (!file) return next(ApiError.badRequest('No uploaded video'));
      const video = v4() + '.mp4';
      file.mv(path.resolve(__dirname, '..', 'static', video));
      const newVideo = Video.create({ title, description, video, views: 0, UserId });
      return res.status(200).json({ newVideo });
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.query;
      const video = await Video.findOne({
        where: { id },
        include: {
          model: User,
          attributes: ['image', 'name', 'id'],
        },
        attributes: {
          exclude: ['UserId'],
        },
      });
      await Video.update(
        { views: video.views + 1 },
        {
          where: { id },
        },
      );
      return res.status(200).json(video);
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }
  async getAll(req, res, next) {
    try {
      let { offset } = req.query;
      offset = offset * 20;
      if (!offset) offset = 0;
      let videos = await Video.findAll({
        limit: 20,
        offset,
        attributes: {
          exclude: ['UserId'],
        },

        include: {
          model: User,
          attributes: ['image', 'name'],
        },
      });
      return res.status(200).json(videos);
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }

  async getBySearch(req, res, next) {
    try {
      const { searchText } = req.body;
      let videos = await Video.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iRegexp]: searchText } },
            { description: { [Op.iRegexp]: searchText } },
          ],
        },
        attributes: {
          exclude: ['UserId'],
        },
        include: {
          model: User,
          attributes: ['image', 'name'],
        },
      });
      return res.status(200).json(videos);
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }

  async getSubscriptionVideos(req, res, next) {
    try {
      const channeles = await Subscribes.findAll({ where: { UserId: req.token.id } });
      let videos = [];
      for (let i = 0; i < channeles.length; i++) {
        const authorVideos = await Video.findAll({
          where: { UserId: channeles[i].channelId },
          attributes: {
            exclude: ['UserId'],
          },
          include: {
            model: User,
            attributes: ['image', 'name'],
          },
        });
        for (let j = 0; j < authorVideos.length; j++) {
          videos.push(authorVideos[j]);
        }
      }
      return res.status(200).json(videos);
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }

  async getLikedVideos(req, res, next) {
    try {
      const likes = await Like.findAll({
        where: { [Op.and]: { UserId: req.token.id, value: 'like' } },
      });
      let videos = [];
      for (let i = 0; i < likes.length; i++) {
        videos.push(
          await Video.findOne({
            where: { id: likes[i].VideoId },
            attributes: {
              exclude: ['UserId'],
            },
            include: {
              model: User,
              attributes: ['image', 'name'],
            },
          }),
        );
      }
      return res.status(200).json(videos);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
}

export default new VideoController();
