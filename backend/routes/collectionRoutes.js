const express= require('express');
const collectionController=require('../controllers/collectionControllers');
const verifyToken = require('../middlewares/auth');
const router = express.Router();
router.post('/create' , verifyToken, collectionController.createCollection);
router.post('/add',verifyToken, collectionController.addToCollection); 
router.post('/remove',verifyToken , collectionController.removeFromCollection);

module.exports=router;