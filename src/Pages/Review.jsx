import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Swal from 'sweetalert2';

const Review = () => {
  const handleReview = (e) => {
    e.preventDefault(); 
    Swal.fire("Thank You!");
  };

  return (
    <div className=" max-w-8xl mx-auto py-10">
      {/* Heading with Typewriter */}
      <div className="text-2xl md:text-3xl pb-10 text-pink-500 font-bold">
        <Typewriter
          words={[
            'Please Give Your Suggestion/Complain',
            'Please Give Your Suggestion/Complain',
            'Please Give Your Suggestion/Complain',
          ]}
          loop={5}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleReview}
        className="bg-gray-200 shadow-lg rounded-lg p-6 space-y-5"
      >
        <fieldset>
          <legend className="text-xl font-semibold mb-3 text-gray-800">
            Suggestion or Complain
          </legend>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Write here..."
            required
          ></textarea>
        </fieldset>

        <div>
          <label className="text-gray-600 text-sm mb-2 block">Optional</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Your name or email (optional)"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300 shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Review;
