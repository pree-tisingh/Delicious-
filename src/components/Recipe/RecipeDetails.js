import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Error fetching recipe details.");
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instruction}</p>
      <p>Cooking Time: {recipe.cookingTime}</p>
      <p>Serving Time: {recipe.servingTime}</p>
      <p>Dietary Preference: {recipe.dietaryPreference}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
    </div>
  );
};

export default RecipeDetails;
