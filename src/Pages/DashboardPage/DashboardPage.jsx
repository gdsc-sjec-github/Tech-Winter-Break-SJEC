import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders, getFiles } from "../../redux/actionCreators/filefolderActionCreator";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../../Components/DashboardComponent/Navbar/Navbar";
import SubBar from "../../Components/DashboardComponent/SubBar/SubBar";
import HomeComponents from "../../Components/DashboardComponent/HomeComponents/HomeComponents";
import FolderComponent from "../../Components/DashboardComponent/FolderComponent/FolderComponent";
import CreateFolder from "../../Components/DashboardComponent/CreateFolder/CreateFolder";
import CreateFile from "../../Components/DashboardComponent/CreateFile/CreateFile";
import FileComponent from "../../Components/DashboardComponent/FileComponent/FileComponent";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      dispatch(getFolders(user.uid));
      dispatch(getFiles(user.uid));
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    if (pathname.includes('/file/')) {
      setShowSubBar(false);
    } else {
      setShowSubBar(true);
    }
  }, [pathname]);

  const handleMoveOperation = () => {
    if (isAuthenticated && user?.uid) {
      dispatch(getFolders(user.uid));
      dispatch(getFiles(user.uid));
    }
  };

  return (
    <>
      <style>{`
        body {
          background-color: #0f0f0f;
          color: #e0e0e0;
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
        }

        .container-fluid {
          margin-top: 20px;
          padding: 20px;
          background-color: #181818;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .btn {
          background-color: #f39c12;
          border: none;
          color: #fff;
          font-weight: bold;
          transition: all 0.3s ease-in-out;
        }

        .btn:hover {
          background-color: #d35400;
          transform: translateY(-2px);
        }

        .card {
          background-color: #202020;
          color: #e0e0e0;
          border: 1px solid #333333;
          border-radius: 8px;
          transition: transform 0.2s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }

        .nav-link {
          color: #e0e0e0;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #f39c12;
        }

        .breadcrumb {
          background-color: #121212;
          border-radius: 8px;
          padding: 10px;
        }

        .breadcrumb-item a {
          color: #f39c12;
        }

        .breadcrumb-item a:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .modal-content {
          background-color: #222222;
          color: #e0e0e0;
          border: 1px solid #333333;
        }

        .modal-header, .modal-footer {
          border-color: #444444;
        }

        .modal-header h5 {
          color: #f39c12;
        }

        .modal-footer .btn {
          background-color: #333333;
          border: none;
        }

        .modal-footer .btn:hover {
          background-color: #555555;
        }

        /* Added custom styles for Create Folder and Create File text */
        .create-text {
          color: lightblue;
        }
      `}</style>

      {isCreateFolderModalOpen && (
        <CreateFolder
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
        />
      )}
      {isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )}

      <Navbar />
      {showSubBar && (
        <SubBar 
          setIsCreateFileModalOpen={setIsCreateFileModalOpen}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}

      <div className="container-fluid">
        <Routes>
          <Route 
            path="" 
            element={
              <HomeComponents 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            } 
          />
          <Route 
            path="folder/:folderId" 
            element={
              <FolderComponent 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            } 
          />
          <Route path="file/:fileId" element={<FileComponent />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardPage;
