const {Sequelize} = require('sequelize');
const sequelize = require('../utils/database');
const Favorite = sequelize.define('Favorite',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNUll:false,
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    recipeId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },


});
module.exports=Favorite;