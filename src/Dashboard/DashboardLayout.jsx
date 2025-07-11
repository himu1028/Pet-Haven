import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Pages/Navbar';

const DashboardLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Add A Pet', path: 'dashboard/addPet' },
    { name: 'My Added Pets ', path: 'dashboard/mypets' },
    { name: 'Adoption Request', path: '/dashboard/settings' },
    { name: 'Create Compaigns', path: 'dashboard/adddonationscampaigns' },
    { name: 'My Donation Compaigns', path: 'dashboard/addPet' },
    { name: 'My Donations', path: 'dashboard/addPet' }
  ];

  return (
    
    <>
<div>
    <Navbar></Navbar>
</div>


    <div className="min-h-screen max-w-8xl py-2 mx-auto flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-full md:w-64 p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`block font-semibold py-2 px-4 rounded hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-300 p-6">
        {/* Default content or Outlet content */}
        {location.pathname === '/dashboard' ? (
          <p className="text-xl font-semibold">Welcome to Dashboard</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
    </>
  );
};

export default DashboardLayout;