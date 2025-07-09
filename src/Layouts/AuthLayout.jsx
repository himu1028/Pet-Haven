import React from 'react';
import { Link, Outlet } from 'react-router';


const AuthLayout = () => {
  return (

<>
 <div className='bg-gray-300'>
  {/* Logo */}
        <div className="text-2xl ml-15 font-bold text-blue-600">
          <Link to="/"><span className='text-4xl text-pink-500'>Pet</span><span >Adoption</span></Link>
        </div>

<div className="min-h-screen max-w-8xl mx-auto flex items-center justify-center bg-gray-300 px-4">
      <div className="   rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
       <div>
        <Outlet></Outlet>
       </div>

        {/* Right: Image */}
        <div className="hidden lg:block">
          <img
            src="https://i.ibb.co/2YPXv8Z4/woman-researching-pet-insurance.png"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
 </div>
</>
       

    
    
  );
};

export default AuthLayout;
