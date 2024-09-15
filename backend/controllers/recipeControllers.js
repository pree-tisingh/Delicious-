const Recipe = require('../models/Recipe');
const {Op} = require('sequelize');
const { s3 } = require('../utils/s3');


exports.createRecipe = async (req, res) => {
    const { title, ingredients, instruction, cookingTime, servingTime } = req.body;
    const imageUrl = req.file ? req.file.location : null; 

    try {
        const newRecipe = await Recipe.create({
            title,
            ingredients,
            instruction,
            cookingTime,
            servingTime,
            imageUrl,  
            userId: req.user.id,
        });

        res.status(200).json(newRecipe);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create the recipe', err });
    }
};

exports.editRecipe = async (req, res) => {
    const { title, ingredients, instruction, cookingTime, servingTime } = req.body;
    const imageUrl = req.file ? req.file.location : req.body.imageUrl;
    try {
      
        const recipe = await Recipe.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe Not Found" });
        }

        recipe.title = title || recipe.title;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instruction = instruction || recipe.instruction;
        recipe.cookingTime = cookingTime || recipe.cookingTime;
        recipe.servingTime = servingTime || recipe.servingTime;
        recipe.imageUrl = imageUrl || recipe.imageUrl;
        await recipe.save();
        res.json(recipe);

    } catch (error) {
        res.status(500).json({ message: "Failed to update the recipe", error });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe Not Found or You Do Not Have Permission to Delete This Recipe' });
        }

        if (recipe.imageUrl) {
            const fileKey = recipe.imageUrl.split('/').pop(); 
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey,
            };
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    console.error('Error deleting image from S3:', err);
                } else {
                    console.log('Image deleted successfully from S3');
                }
            });
        }
        await recipe.destroy();
        return res.status(200).json({ message: "Recipe Deleted Successfully" });
    } catch (error) {
        console.error('Error in deleteRecipe:', error);
        return res.status(500).json({ message: "Failed to delete the recipe", error });
    }
};
exports.searchRecipe = async (req, res) => {
    const { keyword, dietaryPreference, difficulty, maxCookingTime, page, limit } = req.query;
    const filterOptions = {};

    if (keyword) {
        filterOptions[Op.or] = [
            { title: { [Op.like]: `%${keyword}%` } },
            { ingredients: { [Op.like]: `%${keyword}%` } },
        ];
    }
    if (dietaryPreference) {
        filterOptions.dietaryPreference = dietaryPreference;
    }
    if (difficulty) {
        filterOptions.difficulty = difficulty;
    }
    if (maxCookingTime) {
        filterOptions.cookingTime = { [Op.lte]: maxCookingTime };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    try {
        const { count, rows } = await Recipe.findAndCountAll({
            where: filterOptions,
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
        });

        res.json({
            currentPage: pageNumber,
            totalRecipes: count,
            totalPages: Math.ceil(count / pageSize),
            recipes: rows,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to search recipe", err });
    }
};

exports.listRecipes = async(req,res)=>{
    try{
        const recipe = await Recipe.findAll();
        res.json(recipe);
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch the list of recipe",error});
    }
}
exports.getRecipeDetails = async (req, res) => {
    const recipeId = parseInt(req.params.id, 10); 

  if (isNaN(recipeId)) {
    return res.status(400).json({ message: 'Invalid recipe ID' });
  }

  try {

    const recipe = await Recipe.findByPk(recipeId);

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  };
  