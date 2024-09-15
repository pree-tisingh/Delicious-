const express = require('express');
const authController = require('../controllers/authControllers');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', authController.signup); 
router.post('/login', authController.login); 
router.get('/profile',verifyToken, authController.getProfile);
router.get('/users', verifyToken, authController.getAllUsers);
module.exports = router;
