const {Sequelize} = require('sequelize');
const sequelize = require('../utils/database');
const Follow = sequelize.define('Follow',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    followerId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    followingId:{
       type:Sequelize.INTEGER,
       allowNull:false,
    }
});
module.exports=Follow;