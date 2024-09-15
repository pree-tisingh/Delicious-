const express = require('express');
const recipeController = require('../controllers/recipeControllers');
const verifyToken = require('../middlewares/auth');
const upload = require('../utils/s3');
const router = express.Router();

router.post('/create', verifyToken, upload.single('image'), recipeController.createRecipe);
router.put('/edit/:id', verifyToken, upload.single('image'), recipeController.editRecipe);
router.delete('/delete/:id', verifyToken, recipeController.deleteRecipe);
router.get('/search', recipeController.searchRecipe);
router.get('/', recipeController.listRecipes);
router.get('/:id', recipeController.getRecipeDetails);

module.exports = router;
