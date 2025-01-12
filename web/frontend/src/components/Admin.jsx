import React, { useState } from 'react';
import { Home, Users, Package, Settings, X, Menu } from 'lucide-react';
import DashBoard from './DashBoard';
import UsersPage from './UsersPage';
import OrdersPage from './OrdersPage';
import defaultImg from '../assets/default-profile.jpg';

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard'); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex min-h-screen">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-black text-white transition-all duration-300 ease-in-out fixed md:relative h-screen flex flex-col items-center z-50`}>
        <div className="flex justify-between items-center p-4">
          <button className="text-white mx-auto" onClick={toggleSidebar}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
        <div className="flex flex-col items-center p-4">
          <ul className="space-y-8">
            <li>
              <button onClick={() => handlePageChange('dashboard')} className={`flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400 ${activePage === 'dashboard' ? 'text-blue-500' : ''}`}><Home /> {isSidebarOpen && <span>Dashboard</span>}</button>
            </li>
            <li>
              <button onClick={() => handlePageChange('users')} className={`flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400 ${activePage === 'users' ? 'text-blue-500' : ''}`}><Users /> {isSidebarOpen && <span>Users</span>}</button>
            </li>
            <li>
              <button onClick={() => handlePageChange('orders')} className={`flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400 ${activePage === 'orders' ? 'text-blue-500' : ''}`}><Package />{isSidebarOpen && <span>Orders</span>}</button>
            </li>
            <li>
              <button className="flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400"><Settings /> {isSidebarOpen && <span>Settings</span>}</button>
            </li>
          </ul>
        </div>
        <div className={`mt-auto  mb-2 p-4 max-w-[200px] flex justify-center items-center text-white ${isSidebarOpen && 'border border-white-400 rounded-lg'}`}>
          <div className='h-6 w-6 rounded-full overflow-hidden'>
            <img src={defaultImg} alt='Default profile picture' />
          </div>
          <p className={`${isSidebarOpen ? 'block' : 'hidden'} ml-2 text-sm md:text-md font-medium`}>Sandeep Malhotra</p>
        </div>
      </div>

      {activePage === 'dashboard' && <DashBoard />}
      {activePage === 'users' && <UsersPage />}
      {activePage === 'orders' && <OrdersPage />}

    </div>
  );
};

export default Admin;
