import ApiError from '../error/ApiError.js';
import { Subscribes, User } from '../models/models.js';

class SubsController {
  async create(req, res, next) {
    try {
      const { channelId } = req.query;
      const alreadySubscribed = await Subscribes.findOne({
        where: { channelId, UserId: req.token.id },
      });
      if (alreadySubscribed) {
        const subscribe = await Subscribes.destroy({ where: { channelId, UserId: req.token.id } });
        return res.status(200).json({ message: false });
      }
      const subscribe = Subscribes.create({ channelId, UserId: req.token.id });
      if (!subscribe) return next(ApiError.internal('Error on server'));
      return res.status(200).json({ message: true });
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }
  async getOne(req, res, next) {
    try {
      const { channelId } = req.query;
      const subscribe = await Subscribes.findOne({ where: { channelId, UserId: req.token.id } });
      if (!subscribe) return res.status(200).json({ message: false });
      return res.status(200).json({ message: true });
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
  async getAllSubscribers(req, res, next) {
    try {
      const { channelId } = req.query;
      const subscribers = await Subscribes.findAndCountAll({ where: { channelId } });
      if (!subscribers) return res.status(200).json({ subscribers: 0 });
      return res.status(200).json({ subscribers: subscribers.count });
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }

  async getAllSubscribes(req, res, next) {
    try {
      const subscribes = await Subscribes.findAll({
        where: { UserId: req.token.id },
        attributes: ['channelId'],
      });
      if (!subscribes) return res.status(200).json({ message: false });
      for (let i = 0; i < subscribes.length; i++) {
        subscribes[i] = await User.findOne({
          where: { id: subscribes[i].channelId },
          attributes: ['name', 'id', 'image'],
        });
      }
      return res.status(200).json(subscribes);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
}

export default new SubsController();
