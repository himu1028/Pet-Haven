import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';
import { FaDog } from 'react-icons/fa'; // 🐶 Dog icon

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-800">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
        {/* Logo */}
        <div>
          <div className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-1">
              <FaDog className="text-pink-500" size={32} />
              <span className="text-2xl sm:text-3xl font-bold">Adoption</span>
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-700">Bringing you the best service.</p>
        </div>

        {/* Page Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Pages</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
            <li><Link to="/petlisting" className="hover:text-blue-600">Pet Listing</Link></li>
            <li><Link to="/donationcompaigns" className="hover:text-blue-600">Donation Campaigns</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow us</h2>
          <div className="flex space-x-4">
            <a href="www.facebook.com/petadoption" className="hover:text-blue-600"><Facebook size={20} /></a>
            <a href="www.twitter.com/petadoption" className="hover:text-blue-600"><Twitter size={20} /></a>
            <a href="instragram.com/petadoption" className="hover:text-blue-600"><Instagram size={20} /></a>
            <a href="github.com/petadopt10" className="hover:text-blue-600"><Github size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-600 py-4 border-t border-gray-400">
        © {new Date().getFullYear()} YourWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
