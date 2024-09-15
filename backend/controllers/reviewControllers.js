const Review = require('../models/Reviews');
const User = require('../models/User');
exports.submitReview = async (req, res) => {
  const { recipeId, comment, rating } = req.body; 
  const userId = req.user.id;

  if (!recipeId || !comment || !rating) { 
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = await Review.create({ recipeId, comment, rating, userId });
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Error submitting review' });
  }
};

exports.editReviews = async(req,res)=>{
    const {reviewId , rating , comment}=req.body;
    try{
       const review = Review.findOne({where:{id:reviewId , userId:req.user.id}});
       if(!review){
        return res.status(404).json({message:"Review Not Found"});
       }
       review.rating = rating || review.rating;
       review.comment = comment || review.comment;
       await review.save();
       res.json(review);
    }
    catch(err){
        res.status(400).json({message:"Failed to edit the Review",err});
    }
};

exports.deleteReviews = async(req,res)=>{
    const {reviewId}=req.body;
    try{
        const review = Review.findOne({where:{id:reviewId , userId:req.user.id}});
        if(!review){
            return res.status(404).json("Review Not Found");
        }
        await review.destroy();
        res.json(review);
    }
    catch(error){
        res.status(400).json({message:"Failed to delete the review",error});
    }
};
exports.getRecipeReviews = async (req, res) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ message: 'Recipe ID is required' });
  }

  try {
    const reviews = await Review.findAll({
      where: { recipeId },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this recipe' });
    }

    res.json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error); 
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};
