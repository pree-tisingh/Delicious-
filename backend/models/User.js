const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  role: {
    type: Sequelize.ENUM('user', 'admin'),  
    defaultValue: 'user',  
  },
  status: {
    type: Sequelize.ENUM('active', 'banned'),
    defaultValue: 'active',
  }
});

module.exports = User;
