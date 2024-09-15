import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userResponse = await axios.get(
            "http://localhost:5000/api/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(userResponse.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/recipes/search"
        );
        const data = response.data;
        if (Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          console.error("Unexpected data format, expected array");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchUser();
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/recipes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe.id !== id)); 
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleFavorite = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/favorites/add`,
        { recipeId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Recipe marked as favorite");
    } catch (error) {
      console.error("Error favoriting recipe:", error);
    }
  };

  return (
    <div className="recipe-list-container">
      <h1>Recipe List</h1>
      <Link to="/recipes/create">+ Create New Recipe</Link>
      <ul>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.title}</h2>
              <Link to={`/recipes/${recipe.id}`}>View Details</Link>

              {user && recipe.userId === user.id.toString() && (
                <>
                  <Link to={`/recipes/edit/${recipe.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                </>
              )}

              <button onClick={() => handleFavorite(recipe.id)}>Favorite</button>
              <Link to={`/recipes/review/${recipe.id}`}>Review</Link>
              <Link to={`/recipes/rate/${recipe.id}`}>Rate</Link>
            </li>
          ))
        ) : (
          <p>No recipes available</p>
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
