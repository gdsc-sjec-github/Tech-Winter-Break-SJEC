import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./SubBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFileUpload, faFolderPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteFile, deleteFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import CreateFolder from "../CreateFolder/CreateFolder";
import UploadFile from "../UploadFile/UploadFile";
import PropTypes from "prop-types";

const SubBar = ({ setIsCreateFileModalOpen, selectedItems, setSelectedItems }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) {
      selectedItems.forEach((item) => {
        if (item.type === "folder") {
          dispatch(deleteFolder(item.docId));
        } else {
          dispatch(deleteFile(item.docId));
        }
      });
      setSelectedItems([]); // Clear selection after delete
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-black py-2 px-5">
        <nav className="ms-5" aria-label="breadcrumb">
          <ol className="breadcrumb d-flex align-items-center">
            <li className="breadcrumb-item">
              <Link to="/dashboard" style={{ color: "lightblue" }}> {/* Changed Root color to light blue */}
                Root
              </Link>
            </li>
            {location.pathname !== "/dashboard" && (
              <li className="breadcrumb-item active" style={{ color: "purple" }}>
                {folderId}
              </li>
            )}
          </ol>
        </nav>

        <ul className="navbar-nav ms-auto me-5">
          <li className="nav-item mx-2">
            <button
              className="btn btn-outline-danger custom-btn"
              onClick={handleDelete}
              disabled={selectedItems.length === 0}
            >
              <FontAwesomeIcon icon={faTrash} />
              &nbsp; Delete ({selectedItems.length})
            </button>
          </li>
          <li className="nav-item mx-2">
            <button
              className="btn btn-outline-dark custom-btn"
              onClick={() => setIsUploadFileModalOpen(true)}
            >
              <FontAwesomeIcon icon={faFileUpload} />
              &nbsp; Upload Files
            </button>
          </li>
          <li className="nav-item mx-2">
            <button
              className="btn btn-outline-dark custom-btn"
              onClick={() => setIsCreateFileModalOpen(true)}
            >
              <FontAwesomeIcon icon={faFileAlt} />
              &nbsp; Create File
            </button>
          </li>
          <li className="nav-item ms-2">
            <button
              className="btn btn-outline-dark custom-btn"
              onClick={() => setIsCreateFolderModalOpen(true)}
            >
              <FontAwesomeIcon icon={faFolderPlus} />
              &nbsp; Create Folder
            </button>
          </li>
        </ul>
      </nav>

      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      {isUploadFileModalOpen && (
        <UploadFile setIsUploadFileModalOpen={setIsUploadFileModalOpen} />
      )}
    </>
  );
};

SubBar.propTypes = {
  setIsCreateFileModalOpen: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default SubBar;
