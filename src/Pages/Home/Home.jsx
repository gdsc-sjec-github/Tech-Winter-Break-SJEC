import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-links">
        </div>
      </nav>

      <div className="content">
        <h1 className="heading">DOCUSPHERE</h1>
        <div className="button-container">
          <button onClick={() => navigate('/login')}>
            Login
          </button>
          <button onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 