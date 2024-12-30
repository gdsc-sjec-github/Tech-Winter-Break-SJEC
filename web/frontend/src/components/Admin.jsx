import React, { useState } from 'react';
import { Home, Users, Package, Settings, X, Menu } from 'lucide-react';
import DashBoard from './DashBoard';
import UsersPage from './UsersPage';
import OrdersPage from './OrdersPage'

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
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-black text-white transition-all duration-300 ease-in-out fixed md:relative h-screen flex flex-col z-50`}>
        <div className="flex justify-between items-center p-4">
          <button className="text-white mx-auto" onClick={toggleSidebar}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
        <div className="flex flex-col items-center p-4">
          <ul className="space-y-8">
            <li>
              <button onClick={() => handlePageChange('dashboard')} className="flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400"><Home /> {isSidebarOpen && <span>Dashboard</span>}</button>
            </li>
            <li>
              <button onClick={() => handlePageChange('users')} className="flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400"><Users /> {isSidebarOpen && <span>Users</span>}</button>
            </li>
            <li>
              <button onClick={() => handlePageChange('orders')} className="flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400"><Package />{isSidebarOpen && <span>Orders</span>}</button>
            </li>
            <li>
              <button className="flex items-center space-x-2 text-md sm:text-xl hover:text-blue-400"><Settings /> {isSidebarOpen && <span>Settings</span>}</button>
            </li>
          </ul>
        </div>
        <div className="mt-auto p-4 text-white">
          <p>Footer Content</p>
        </div>
      </div>

      {activePage === 'dashboard' && <DashBoard />}
      {activePage === 'users' && <UsersPage />}
      {activePage === 'orders' && <OrdersPage />}

    </div>
  );
};

export default Admin;
