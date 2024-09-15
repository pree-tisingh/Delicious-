import { useParams } from "react-router-dom";
import { useState } from "react";
import '../styles/ReviewForm.css';
import axios from "axios";

const ReviewForm = () => {
  const { recipeId } = useParams();
  const [comment, setComment] = useState(''); 
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeId || !comment || !rating) { 
      setError('All fields are required');
      return;
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
      setError('Rating must be a number between 1 and 5');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/reviews/submit',
        { recipeId, comment, rating },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      console.log('Review submitted:', response.data);
      setSuccess('Review submitted successfully');
      setComment('');
      setRating('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Error submitting review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit Review</h1>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          required
        />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
      </div>
      <button type="submit">Submit Review</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default ReviewForm;
