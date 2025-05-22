const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'shreyash3003@S',
  database: process.env.DB_NAME || 'bloghub',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

module.exports = sequelize;