import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/actionCreators/authActionCreator";

const NavigationComponent = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/">
          File Management System
        </Link>

        <ul className="navbar-nav ms-auto me-5">
          {isAuthenticated ? (
            <>
              <li className="nav-item d-flex align-items-center mx-2">
                <p className="my-0 mt-1 mx-2">
                  <span className="text-light">Welcome </span>
                  <span className="text-warning">{user.displayName}</span>
                </p>
                <Link className="btn btn-success btn-sm me-2" to="/dashboard">
                  Dashboard
                </Link>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => dispatch(signOut())}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-success btn-sm me-2" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success btn-sm me-2" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationComponent;
