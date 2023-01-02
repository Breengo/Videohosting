import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import path from 'path';
import { v4 } from 'uuid';
import { Subscribes, User, Video } from '../models/models.js';
import { Op } from 'sequelize';

class UserController {
  async registration(req, res, next) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    try {
      const { email, password, name } = req.body;
      let img = req.files;
      if (img) {
        img = img.image;
      }
      let image;
      if (img) {
        image = v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', image));
      } else {
        image = 'default.jpg';
      }
      if (!email || !password) {
        return next(ApiError.badRequest('Incorrect email or password'));
      }
      const candidate = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });
      if (candidate) {
        return next(ApiError.badRequest('Username or email already taken'));
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const user = await User.create({ name, email, password: hashPassword, image });
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, image: user.image },
        process.env.SECRET_KEY,
      );
      return res.status(200).json({ message: token });
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) return next(ApiError.badRequest('Incorrect login or password'));
      const rightPass = await bcrypt.compare(password, user.password);
      if (!rightPass) return next(ApiError.badRequest('Incorrect login or password'));
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, image: user.image },
        process.env.SECRET_KEY,
      );
      return res.status(200).json({ message: token });
    } catch (e) {
      console.log(e);
      return next(ApiError.badRequest(e));
    }
  }
  async auth(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) return next(ApiError.forbidden('Unathorized'));
      const rightToken = jwt.verify(token, process.env.SECRET_KEY);
      if (rightToken) return res.status(200).json(rightToken);
    } catch (error) {
      return next(ApiError.internal(error));
    }
  }

  async getDetails(req, res, next) {
    try {
      const { id } = req.query;
      let user = await User.findOne({ where: { id }, attributes: ['name', 'email', 'image'] });
      const subscribers = await Subscribes.findAndCountAll({ where: { channelId: id } });
      const videos = await Video.findAll({ where: { UserId: id } });
      user.dataValues.subscribers = subscribers.count;
      user.dataValues.videos = videos;
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal(error));
    }
  }
}

export default new UserController();
