const express = require('express');
const favController = require('../controllers/favControllers');
const verifyToken = require('../middlewares/auth');
const { verify } = require('jsonwebtoken');
const router = express.Router();
router.post('/add' , verifyToken , favController.addFav);
router.post('/remove' , verifyToken , favController.removeFav);
router.get('/',verifyToken,favController.getFavorites);
module.exports=router;