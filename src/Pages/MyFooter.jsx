import React from 'react';
import { Link } from 'react-router-dom';

const MyFooter = () => {
  return (
    <div className="bg-gray-500 max-w-8xl rounded-xl mx-auto text-gray-300 pt-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left: Logo and Web Name */}
        <div className="mb-6 md:mb-0 flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo"
            className="h-8"
          />
          <span className="text-2xl font-semibold text-white">
            MyWebsite
          </span>
        </div>

        {/* Center: Page Links */}
        <div className="mb-6 md:mb-0">
          <h2 className="mb-4 text-sm font-semibold uppercase text-white">
            Pages
          </h2>
          <ul className="text-gray-400 flex flex-col md:flex-row gap-4 items-center">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/petlisting"className="hover:underline">Pet Listing</Link>
            </li>
            <li>
              <Link to="/donationcompaigns" className="hover:underline">Donation Campaigns</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right: Follow Us */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase text-white">
            Follow us
          </h2>
          <div className="flex space-x-6 justify-center md:justify-end">
            <a href="https://facebook.com/pethaven" target="_blank" rel="noreferrer" className="hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.87v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.9h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="https://twitter.com/pethaven1" target="_blank" rel="noreferrer" className="hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.4a9 9 0 0 1-2.87 1.1A4.52 4.52 0 0 0 16.67 0a4.5 4.5 0 0 0-4.47 5.52A12.82 12.82 0 0 1 1.67 1.15 4.47 4.47 0 0 0 2.89 7.1a4.42 4.42 0 0 1-2-.55v.05a4.5 4.5 0 0 0 3.62 4.4 4.48 4.48 0 0 1-2 .08 4.52 4.52 0 0 0 4.2 3.13A9 9 0 0 1 1 19.53a12.8 12.8 0 0 0 6.92 2" />
              </svg>
            </a>
            <a href="https://instagram.com/havenpet" target="_blank" rel="noreferrer" className="hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-7.999.001 4 4 0 0 1 7.999-.001z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © 2025 MyWebsite. All Rights Reserved.
      </div>
    </div>
  );
};

export default MyFooter;
