// authActionCreators.js

import * as types from "../actionsTypes/authActionTypes";
import fire from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Action to log in user
const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

// Action to log out user
const logOutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

// Utility function to handle success/failure updates
const handleSuccess = (setSuccess, success) => {
  if (typeof setSuccess === "function") {
    setSuccess(success);
  }
};

// Action creators
export const signInUser = (email, password, setSuccess) => (dispatch) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        loginUser({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );
      handleSuccess(setSuccess, true); // Safeguard
    })
    .catch((error) => {
      alert("Invalid email or password");
      console.error(error);
      handleSuccess(setSuccess, false); // Safeguard
    });
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user
        .updateProfile({ displayName: name })
        .then(() => {
          dispatch(
            loginUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
          handleSuccess(setSuccess, true); // Safeguard
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          handleSuccess(setSuccess, false); // Safeguard
        });
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("The email address is already in use by another account.");
          break;
        case "auth/invalid-email":
          alert("Invalid email address.");
          break;
        case "auth/weak-password":
          alert("Password is too weak.");
          break;
        default:
          alert("Error signing up. Please try again.");
          break;
      }
      console.error(error);
      handleSuccess(setSuccess, false); // Safeguard
    });
};

export const signOut = () => (dispatch) => {
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(logOutUser());
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

// Check if user is logged in and update state
export const checkIsLoggedIn = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    }
  });
};

// Add Google Sign In action
export const signInWithGoogle = (setSuccess) => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(fire.auth(), provider);
    const user = result.user;

    // Dispatch login action with user data
    dispatch(
      loginUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    );
    
    setSuccess(true);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    alert(error.message);
    setSuccess(false);
  }
};
