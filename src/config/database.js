const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Missing required database environment variables.');
}

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

module.exports = sequelize;
