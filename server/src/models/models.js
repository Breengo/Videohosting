import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  image: { type: DataTypes.STRING },
});

const Video = sequelize.define('Video', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  video: { type: DataTypes.STRING },
  views: { type: DataTypes.INTEGER },
});

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT },
});

const Like = sequelize.define('Like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING },
});

const Subscribes = sequelize.define('Subscribes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  channelId: { type: DataTypes.INTEGER },
});

User.hasMany(Video);
Video.belongsTo(User);

Video.hasMany(Comment);
Comment.belongsTo(Video);

Video.hasMany(Like);
Like.belongsTo(Video);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Subscribes);
Subscribes.belongsTo(User);

export { Comment, User, Like, Video, Subscribes };
export default { Comment, User, Like, Video, Subscribes };
