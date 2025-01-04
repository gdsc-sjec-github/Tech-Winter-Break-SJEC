// CreateFile.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFile } from "../../../redux/actionCreators/filefolderActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const CreateFile = ({ setIsCreateFileModalOpen }) => {
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const location = useLocation();

  // Get current user from Redux state
  const { user } = useSelector(state => state.auth);
  const { currentFolder } = useSelector(state => state.filefolders);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileName.trim()) {
      // Determine the parent folder based on current location
      const parent = location.pathname.includes('/folder/') ? currentFolder : "root";
      
      const data = {
        name: fileName.trim(),
        userId: user.uid,
        parent: parent,
        createdAt: new Date(),
      };

      console.log('Creating file with data:', data); // Debug log

      try {
        dispatch(createFile(data, (success) => {
          if (success) {
            setFileName("");
            setIsCreateFileModalOpen(false);
          }
        }));
      } catch (error) {
        console.error("Error creating file:", error);
        alert("Error creating file. Please try again.");
      }
    } else {
      alert("Please enter a file name");
    }
  };

  // Determine if we're in a folder or root
  const isInFolder = location.pathname.includes('/folder/');

  return (
    <div 
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">
              Create New File {isInFolder ? "in Current Folder" : "in Root"}
            </h4>
            <button 
              className="btn"
              onClick={() => setIsCreateFileModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="fileName"
                placeholder="Enter File Name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary me-2">
                Create File
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsCreateFileModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateFile.propTypes = {
  setIsCreateFileModalOpen: PropTypes.func.isRequired,
};

export default CreateFile;
