import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaDog } from 'react-icons/fa';
import DarkModeToggle from '../../Component/DarkModeToggle';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser } = useAuth(); 
  const navigate = useNavigate();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Pet Listing', path: '/petlisting' },
    { name: 'Donation Campaigns', path: '/donationcompaigns' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    signOutUser().then(() => {
      navigate("/");
      Swal.fire("Successfully Logout!");
    });
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-300 max-w-8xl mx-auto shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with Dog Icon */}
        <div className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-1">
            <FaDog className="text-pink-500" size={28} />
            <span className="text-2xl font-bold">Pet Haven</span>
          </Link>
        </div>
           
            


        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4 relative">
          {user && user.email ? (
            <div className="relative">
              <img
                className='rounded-full w-10 h-10 cursor-pointer border'
                src={user.photoURL || "https://i.ibb.co/YTjW3vF/default-avatar.png"}
                alt="user"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md py-2 z-50 w-40">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
            

              <Link to="/login" className="px-4 py-2 border rounded-md text-sm hover:bg-blue-50">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {links.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2">
            {user && user.email ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded-md text-sm hover:bg-blue-50">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 border rounded-md text-sm hover:bg-blue-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
            
                <Link to="/login" className="px-4 py-2 border rounded-md text-sm hover:bg-blue-50">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 