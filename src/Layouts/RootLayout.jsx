import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Navbar';
import MyFooter from '../Pages/MyFooter';

const RootLayout = () => {
 

  

  

  return (
    <>
    
       

      <div className='bg-gray-300 ' >
        <Navbar />
        <Outlet />
        
        <MyFooter />
      </div>
    </>
  );
};

export default RootLayout;
