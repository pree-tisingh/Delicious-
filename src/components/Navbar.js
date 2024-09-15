import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav>
      <div className="container">
        <Link to="/" className="brand">RecipeApp</Link>
        <ul className="nav-links">
          <li><Link to="/recipes">Recipes</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/activity-feed">Activity Feed</Link></li>
              <li><Link to="/users">Followers</Link></li>
             
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
          <li className="social-media">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i> 
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i> 
            </a>
            <li><button onClick={onLogout}>Logout</button></li>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
