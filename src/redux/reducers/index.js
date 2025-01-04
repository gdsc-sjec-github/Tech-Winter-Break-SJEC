// src/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import filefoldersReducer from "./filefoldersReducer";

const rootReducer = combineReducers({
    auth: authReducer,        // Contains isAuthenticated, uid, email, etc.
    filefolders: filefoldersReducer, // Should manage filefolders state
});

export default rootReducer;
