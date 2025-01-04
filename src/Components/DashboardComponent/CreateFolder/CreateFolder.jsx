import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useParams } from "react-router-dom";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const { folderId } = useParams();

  // Get current user from Redux state
  const { user } = useSelector(state => state.auth);
  const { currentFolder } = useSelector(state => state.filefolders);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      // Determine the parent folder based on current location
      const parent = location.pathname.includes('/folder/') ? currentFolder : "root";
      
      const data = {
        name: folderName.trim(),
        userId: user.uid,
        parent: parent,
        createdAt: new Date(),
      };

      console.log('Creating folder with data:', data);

      try {
        dispatch(createFolder(data));
        setFolderName("");
        setIsCreateFolderModalOpen(false);
      } catch (error) {
        console.error("Error creating folder:", error);
        alert("Error creating folder. Please try again.");
      }
    } else {
      alert("Please enter a folder name");
    }
  };

  return (
    <div 
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">
              Create New Folder {location.pathname.includes('/folder/') ? "in Current Folder" : ""}
            </h4>
            <button 
              className="btn"
              onClick={() => setIsCreateFolderModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="folderName"
                placeholder="Enter Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary me-2">
                Create Folder
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsCreateFolderModalOpen(false)}
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

export default CreateFolder;
