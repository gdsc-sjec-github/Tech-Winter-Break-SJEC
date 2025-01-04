import React from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/actionCreators/authActionCreator";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    // Dispatching login action
    dispatch(signInUser(email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div className="form-group mb-4">
        <label htmlFor="emailInput" className="form-label" style={{ fontWeight: "bold", color: "#5369f8" }}>
          Email Address
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="passwordInput" className="form-label" style={{ fontWeight: "bold", color: "#5369f8" }}>
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-theme w-100"
        style={{
          backgroundColor: "#6200EE", // Adjust the background color as needed
          color: "#ffffff", // White text color
          border: "none",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
