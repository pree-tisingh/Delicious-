import { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteButton from './FavoriteButton'; 
import '../styles/FavoriteRecipes.css';

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorites/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Fetched favorites:', response.data); 
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        setError('Error fetching favorite recipes');
      }
    };

    fetchFavorites();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="favorite-recipes-container">
      <h2>Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes found.</p>
      ) : (
        <ul className="favorite-recipes-list">
          {favorites.map((fav) => (
            fav.Recipe ? ( 
              <li key={fav.id}>
                <h3>{fav.Recipe.title}</h3>
                <p>{fav.Recipe.ingredients}</p>
                <FavoriteButton recipeId={fav.Recipe.id} isFavorited={true} /> 
              </li>
            ) : (
              <li key={fav.id}>Recipe data unavailable</li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteRecipes;
