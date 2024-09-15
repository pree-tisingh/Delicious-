const express = require('express');
const adminController = require('../controllers/adminControllers');
const isAdmin = require('../middlewares/adminMiddleware');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.patch('/users/ban/:userId', verifyToken, isAdmin, adminController.banUser);
router.patch('/users/approve/:userId', verifyToken, isAdmin, adminController.approvedUser);
router.get('/recipes', verifyToken, isAdmin, adminController.getAllRecipes);
router.delete('/recipes/:recipeId', verifyToken, isAdmin, adminController.deleteRecipes);

module.exports = router;
