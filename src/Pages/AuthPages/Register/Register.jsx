import React from 'react';
import RegisterForm from '../../../Components/AuthComponents/RegisterForm';
import { Link } from "react-router-dom";

const Register = () => {
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
      color: '#BB86FC',
      marginBottom: '2rem',
      textShadow: '0 0 10px #BB86FC, 0 0 20px #BB86FC, 0 0 30px #BB86FC',
    },
    row: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    col: {
      backgroundColor: '#1F1B24',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      width: '100%',
      maxWidth: '500px',
    },
    link: {
      color: '#03DAC6',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    linkHover: {
      color: '#BB86FC',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register here</h1>
      <div style={styles.row}>
        <div style={styles.col}>
          <RegisterForm />
          <div className="text-center mt-3">
            Already a member?&nbsp;
            <Link 
              to="/login" 
              style={styles.link}
              onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
              onMouseOut={(e) => (e.target.style.color = styles.link.color)}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
