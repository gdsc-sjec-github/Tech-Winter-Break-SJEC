import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../redux/actionCreators/authActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons"; // Stylish custom icon
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/dashboard">
          <FontAwesomeIcon icon={faGlobe} className="brand-icon" />
          Docusphere
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-5">
            {isAuthenticated ? (
              <>
                <li className="nav-item d-flex align-items-center mx-2">
                  <p className="my-0 mt-2 mx-2">
                    <span className="text-light">Welcome, </span>
                    <span className="fw-bold text-highlight">{user.displayName}</span>
                  </p>
                  <Link className="btn btn-outline-light btn-sm me-2" to="/">
                    Home
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(signOut())}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link className="btn btn-outline-light btn-sm" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="btn btn-outline-light btn-sm" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
