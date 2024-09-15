import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/RecipeReviews.css'; 

const RecipeReviews = () => {
  const { recipeId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      if (!recipeId) {
        console.error('Recipe ID is not defined');
        setError('Recipe ID is not defined');
        return;
      }
      try {
        console.log('Fetching reviews for recipeId:', recipeId);
        const response = await axios.get(`http://localhost:5000/api/reviews/${recipeId}`);
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Error fetching reviews');
      }
    };
    
    fetchReviews();
  }, [recipeId]);

  if (error) return <div className="no-reviews">{error}</div>;

  return (
    <div className="recipe-reviews-container">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <p className="review-comment">{review.comment}</p>
            <p className="review-rating">Rating: {review.rating}</p>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews yet.</p>
      )}
    </div>
  );
};

export default RecipeReviews;
