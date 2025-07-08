import React, { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Pet Listing', path: '/about' },
    { name: 'Donation Campaigns', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-gray-300 max-w-8xl mx-auto shadow-md  sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/"><span className='text-4xl text-pink-500'>Pet</span><span >Adoption</span></Link>
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
        <div className="hidden md:flex gap-4">
          <Link to="/login" className="px-4 py-2 border rounded-md text-sm hover:bg-blue-50">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Register
          </Link>
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
          <div className="pt-3 flex flex-col gap-2">
            <Link to="/login" className="border px-4 py-2 rounded-md text-sm text-center">
              Login
            </Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm text-center">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
