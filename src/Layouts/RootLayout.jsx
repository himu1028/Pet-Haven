import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Navbar';
import Footer from '../Pages/Footer';
import AOS from 'aos';

const RootLayout = () => {
    return (
        <div className='bg-gray-300'>
          <div>
              <Navbar />
          </div>
          <div>
             <Outlet />
          </div>
          <div>
              <Footer />
          </div>
        </div>
    );
};

export default RootLayout;
