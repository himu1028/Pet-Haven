import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Navbar';

import AOS from 'aos';
import MyFooter from '../Pages/MyFooter';

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
              <MyFooter />
          </div>
        </div>
    );
};

export default RootLayout;
