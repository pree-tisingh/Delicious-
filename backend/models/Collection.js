const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database'); 

const Collection = sequelize.define('Collection', {
    id: {
        type:Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    },
});

module.exports = Collection;
