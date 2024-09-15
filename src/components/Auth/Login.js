import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate inside the component
import "../../styles/Login.css";
const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize inside the component

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/profile"); // Use navigate here after successful login
      }
    } catch (error) {
      setError("Invalid credentials");
      console.log("Login Error:", error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
