import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
   
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl  md:text-4xl font-bold text-gray-800">Contact Us</h1>
    

        <p className="text-gray-600">
          We're here to help. Feel free to reach out to us using the information below.
        </p>

        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-indigo-600 text-xl" />
            <span className="text-gray-800 font-medium">+880 1234 567890</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-indigo-600 text-xl" />
            <span className="text-gray-800 font-medium">support@pethaven.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-indigo-600 text-xl" />
            <span className="text-gray-800 font-medium">
              Gopalganj, Bangladesh
            </span>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Pet Haven. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Contact;
