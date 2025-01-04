import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInUser, signInWithGoogle } from "../../../redux/actionCreators/authActionCreator";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '2rem',
      textShadow: '0 0 10px #BB86FC, 0 0 20px #BB86FC, 0 0 30px #BB86FC',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
    card: {
      backgroundColor: '#1F1B24',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      width: '100%',
      maxWidth: '400px',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      backgroundColor: '#2d2d2d',
      border: '1px solid #BB86FC',
      borderRadius: '4px',
      color: '#ffffff',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      backgroundColor: '#BB86FC',
      border: 'none',
      borderRadius: '4px',
      color: '#000000',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    googleButton: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      backgroundColor: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      color: '#000000',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
    },
    link: {
      color: '#BB86FC',
      textDecoration: 'none',
      fontWeight: 'bold',
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(signInUser(email, password, setSuccess));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle(setSuccess));
  };

  if (success) {
    navigate("/dashboard");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>DOCUSPHERE</h1>
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <button 
          onClick={handleGoogleSignIn}
          style={styles.googleButton}
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            style={{ width: '20px', height: '20px' }} 
          />
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <small>
            Don't have an account? {' '}
            <Link to="/register" style={styles.link}>
              Register here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;  