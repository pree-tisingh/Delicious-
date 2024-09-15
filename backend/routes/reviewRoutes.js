const express = require('express');
const ReviewController = require('../controllers/reviewControllers');
const verifyToken = require('../middlewares/auth');
const router = express.Router();
router.post('/submit', verifyToken , ReviewController.submitReview);
router.put('/edit', verifyToken , ReviewController.editReviews);
router.delete('/delete' , verifyToken , ReviewController.deleteReviews);
router.get('/:recipeId', ReviewController.getRecipeReviews);
module.exports=router;