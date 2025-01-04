import './App.css';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';
import Login from './Pages/AuthPages/Login/Login';
import Register from './Pages/AuthPages/Register/Register';
import { Home } from './Pages/Home/Home';
import DashboardPage from './Pages/DashboardPage/DashboardPage';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard/*" element={<DashboardPage/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
