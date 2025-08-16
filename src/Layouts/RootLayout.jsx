import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Navbar';
import MyFooter from '../Pages/MyFooter';

const RootLayout = () => {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Save theme & update HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* Dark Mode Toggle Button
      <div className="flex justify-end items-center w-0.5 mx-auto bg-base-100 shadow-sm">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-1 py-1 rounded-full bg-base-200 dark:bg-base-300 text-sm shadow-md"
        >
          <span className="text-xs font-semibold">
            {theme === 'light' ? 'Light' : 'Dark'}
          </span>
          <input
            type="checkbox"
            className="toggle toggle-md toggle-success"
            checked={theme === 'dark'}
            readOnly
          />
        </button>
      </div> */}

      {/* Navbar + Page Content */}
      <div className="bg-gray-300 dark:bg-gray-900">
        <Navbar />
        <Outlet />
        <MyFooter />
      </div>
    </>
  );
};

export default RootLayout; 