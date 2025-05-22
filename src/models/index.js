const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');
const Category = require('./category');

// Define associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Category.hasMany(Post, {
  foreignKey: 'category_id',
  as: 'posts'
});

Post.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

module.exports = {
  sequelize,
  User,
  Post,
  Category
};