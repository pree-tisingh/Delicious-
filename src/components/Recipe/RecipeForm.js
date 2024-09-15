import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/RecipeForm.css'; // Ensure this path is correct

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servingTime, setServingTime] = useState("");
  const [image, setImage] = useState(null); // Define image state
  const [dietaryPreference, setDietaryPreference] = useState("None");
  const [difficulty, setDifficulty] = useState("Easy");
  const [isEditing, setIsEditing] = useState(false); // Define isEditing state
  const [recipeId, setRecipeId] = useState(null); // Define recipeId state

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/recipes/${id}`).then((response) => {
        const recipe = response.data;
        setTitle(recipe.title);
        setIngredients(recipe.ingredients);
        setInstruction(recipe.instruction);
        setCookingTime(recipe.cookingTime);
        setServingTime(recipe.servingTime);
        setDietaryPreference(recipe.dietaryPreference);
        setDifficulty(recipe.difficulty);
        setRecipeId(recipe.id);
        setIsEditing(true);
      })
      .catch(error => console.error("Failed to load the recipe", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instruction', instruction);
    formData.append('cookingTime', cookingTime);
    formData.append('servingTime', servingTime);
    formData.append('dietaryPreference', dietaryPreference);
    formData.append('difficulty', difficulty);
  
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const token = localStorage.getItem('token'); // Assuming you are storing the token in localStorage
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/recipes/edit/${recipeId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/recipes/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      navigate('/recipes');
    } catch (error) {
      console.error("Failed to create or edit the recipe", error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>{isEditing ? 'Edit Recipe' : 'Create Recipe'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <textarea
        placeholder="Instruction"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cooking Time"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Serving Time"
        value={servingTime}
        onChange={(e) => setServingTime(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <select
        value={dietaryPreference}
        onChange={(e) => setDietaryPreference(e.target.value)}
      >
        <option value="none">None</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Gluten-free">Gluten-free</option>
        <option value="Non-veg">Non-veg</option>
      </select>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <button type="submit">{isEditing ? 'Update Recipe' : 'Create Recipe'}</button>
    </form>
  );
};

export default RecipeForm;
