import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Profile";
import RecipeList from "./components/Recipe/RecipeList";
import RecipeDetails from "./components/Recipe/RecipeDetails";
import RecipeForm from "./components/Recipe/RecipeForm";
import ReviewForm from "./components/ReviewForm";
import FavoriteRecipes from "./components/Favorite";
import RecipeReview from "./components/RecipeReviews";
import FollowUser from "./components/FollowUser";
import ActivityFeed from "./components/ActivityFeed";
import RecipeReviews from "./components/RecipeReviews";
import UserList from "./components/UserList";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }, 
        })
        .then((response) => setUser(response.data))
        .catch((error) => {
          console.error("Failed to fetch profile", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      const token = response.data.token;
      const profileResponse = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(profileResponse.data); 
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    setUser(null); 
  };
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />; 
  };

  return (
    <Router>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/create" element={<RecipeForm />} />
        <Route path="/recipes/edit/:id" element={<RecipeForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipes/review/:recipeId" element={<RecipeReview />} />
        <Route path="/recipes/rate/:recipeId" element={<ReviewForm />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile user={user} />} />}
        />

        <Route
          path="/recipes"
          element={<ProtectedRoute element={<RecipeList />} />}
        />
        <Route
          path="/recipes/new"
          element={<ProtectedRoute element={<RecipeForm />} />}
        />
        <Route
          path="/recipes/:id"
          element={<ProtectedRoute element={<RecipeDetails />} />}
        />
        <Route
          path="/review/:recipeId"
          element={<ProtectedRoute element={<RecipeReviews />} />}
        />
        <Route
          path="/favorites"
          element={<ProtectedRoute element={<FavoriteRecipes />} />}
        />
        <Route
          path="/follow"
          element={<ProtectedRoute element={<FollowUser />} />}
        />
        <Route
          path="/activity-feed"
          element={<ProtectedRoute element={<ActivityFeed />} />}
        />
        <Route
          path="/users"
          element={<ProtectedRoute element={<UserList />} />}
        />
        <Route path="/" element={<RecipeList />} />
      </Routes>
    </Router>
  );
};

export default App;
