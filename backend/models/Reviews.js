const {Sequelize}= require('sequelize');
const sequelize = require('../utils/database');
const Review = sequelize.define('Review',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    rating:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    comment:{
       type:Sequelize.TEXT,
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    recipeId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
}
);

module.exports=Review;