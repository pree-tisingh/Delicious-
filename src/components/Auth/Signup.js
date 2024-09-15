import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, phone });
          if (response.data.token) {
            localStorage.setItem('token', response.data.token); 
            navigate("/login"); 
          }
        } catch (error) {
          console.error("Signup Error", error);
        }
      };
      
  
    return (
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
};

export default Signup;
