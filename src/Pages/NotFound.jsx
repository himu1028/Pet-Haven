import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 text-gray-800">
      {/* Cat Image */}
      <img
        src="https://i.ibb.co.com/Ps6SFqXc/Chat-GPT-Image-Aug-16-2025-11-53-39-PM.png" 
        alt="Grumpy Cat"
        className="w-48 h-48 object-contain mb-6"
      />

      {/* 404 Text */}
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-xl mt-4">Uh oh, we have a problem</p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md transition-all"
      >
        <FaArrowLeft />
        Take me away
      </Link>
    </div>
  );
};

export default NotFound;
