const User = require('../models/User');
const Recipe = require('../models/Recipe');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'role', 'status']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch the users", error });
    }
};

exports.banUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        user.status = 'banned';
        await user.save();
        res.status(200).json({ message: "User has been banned" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.approvedUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        user.status = 'active';
        await user.save();
        res.status(200).json({ message: "User has been approved" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.deleteRecipes = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const recipe = await Recipe.findByPk(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        await recipe.destroy();
        res.status(200).json({ message: "Recipe has been deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete recipe", error });
    }
};
