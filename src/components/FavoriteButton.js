import { useState } from 'react';
import axios from 'axios';
import '../styles/FavoriteRecipes.css';

const FavoriteButton = ({ recipeId, isFavorited }) => {
  const [favorited, setFavorited] = useState(isFavorited);

  const handleAddFavorite = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/favorites/add',
        { recipeId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFavorited(true);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/favorites/remove',
        { recipeId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFavorited(false);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div>
      {favorited ? (
        <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
      ) : (
        <button onClick={handleAddFavorite}>Add to Favorites</button>
      )}
    </div>
  );
};

export default FavoriteButton;
