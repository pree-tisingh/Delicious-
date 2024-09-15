const Follow = require("../models/Follow");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Review = require("../models/Reviews");
const Favorite = require("../models/Favorite");

exports.followUser = async (req, res) => {
  try {
    const userId = req.body;
    if (userId === req.user.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    const userToFollow = await User.findByPk(userId);
    if (!userToFollow) {
      return res.status(404).json("UserNot Found");
    }
    const follow = await Follow.create({
      followerId: req.user.id,
      followingId: userId,
    });
    res
      .status(201)
      .json({ message: `You are now following ${userToFollow.name}`, follow });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.unfollow = async (req, res) => {
  try {
    const userId = req.body;
    const unfollow = await Follow.destroy({
      where: {
        followerId: req.user.id,
        followingId: userId,
      },
    });
    if (!unfollow) {
      return res
        .status(404)
        .json({ message: "You are not following this user" });
    }
  } catch (error) {
    res.status(500).json({ messgae: "Error Unfollowing User", error });
  }
};
exports.getActivityFeed = async (req, res) => {
  try {
    const following = await Follow.findAll({
      where: { followerId: req.user.id },
      attributes: ["followingId"],
    });
    const followingIds = following.map((f) => f.followingId);
    if (!followingIds.length) {
      return res.json({ messgae: "You are not following anyone yet." });
    }

    const recipes = await Recipe.findAll({
      where: { userId: followingIds },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    const reviews = await Review.findAll({
      where: { userId: followingIds },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    const Favorite = await Favorite.findAll({
      where: { userId: followingIds },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    res.json({ recipes, reviews, Favorite });
  } catch (error) {
    res.status(500).json({ message: "Internal ServerError", error });
  }
};
