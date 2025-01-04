import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from "../../Components/DashboardComponent/DashboardNavigation/Navigation";
import SubBar from '../../Components/DashboardComponent/SubBar/SubBar';
import HomeComponent from '../../Components/DashboardComponent/HomeComponent/HomeComponent';
import FolderComponent from '../../Components/DashboardComponent/FolderComponent/FolderComponent';
import FileComponent from '../../Components/DashboardComponent/FileComponent/FileComponent';
import { checkIsLoggedIn } from '../../redux/actionCreators/authActionCreator';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <SubBar />
      <div className="dashboard-main">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/folder/:folderId" element={<FolderComponent />} />
          <Route path="/file/:fileId" element={<FileComponent />} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard; 