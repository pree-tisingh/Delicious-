const Favorite = require("../models/Favorite"); 
const Recipe = require('../models/Recipe');


exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.findAll({
      where: { userId },
      include: {
        model: Recipe,
        attributes: ['id', 'title', 'ingredients'],
      },
    });
    console.log('Favorites fetched:', favorites);
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user.' });
    }

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite recipes.', error });
  }
};
exports.addFav = async (req, res) => {
  const { recipeId } = req.body;
  try {
    const existingFav = await Favorite.findOne({
      where: { userId: req.user.id, recipeId },
    });

    if (existingFav) {
      return res.status(400).json({ message: 'Recipe already favorited' });
    }

    const fav = await Favorite.create({
      userId: req.user.id,
      recipeId,
    });
    res.status(201).json(fav); 
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

exports.removeFav = async (req, res) => {
  const { recipeId } = req.body;
  try {
    const fav = await Favorite.destroy({
      where: { userId: req.user.id, recipeId },
    });

    if (fav) {
      res.json({ message: "Favorite Removed" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from favorites", err });
  }
};
