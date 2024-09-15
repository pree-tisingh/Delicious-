const express= require('express');
const followController = require('../controllers/followControllers');
const verifyToken = require('../middlewares/auth');
const router = express.Router();
router.post('/follow',verifyToken,followController.followUser);
router.post('/unfollow',verifyToken,followController.unfollow);
router.get('/feed',verifyToken,followController.getActivityFeed);
module.exports=router;