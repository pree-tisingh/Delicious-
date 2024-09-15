const {Sequelize} = require('sequelize');
const sequelize = require('../utils/database');
const Recipe = sequelize.define('Recipe' , {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    ingredients:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    instruction:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    cookingTime:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    servingTime:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    imageURL:{
        type:Sequelize.STRING
    },
    dietaryPreference:{
        type:Sequelize.ENUM('Vegetarian', 'Vegan' , 'gloten-free' , 'non-veg','none'),
        defaultValue:'none',
    },
    difficulty:{
        type:Sequelize.ENUM('Easy','Medium','Hard'),
        defaultValue:'Easy',
    },
});
module.exports=Recipe;