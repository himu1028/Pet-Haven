import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
  return (
    <section className="bg-gray-300 py-10">
      <div className="max-w-8xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="md:w-1/2">
            <div className="text-2xl md:text-3xl pb-10 text-pink-500 font-bold">
                  <Typewriter
                    words={[
                      'About Us',
                      'About Us',
                      'About Us',
                    ]}
                    loop={5}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </div>
          <p className="text-gray-700 mb-3 text-lg">
            <strong><span className='text-2xl text-pink-500'>Pet </span><span className='text-blue-500'>Haven</span></strong> is a platform built to help abandoned and rescued animals find loving homes. 
            Users can browse available pets, view detailed profiles, and connect with shelters or pet owners directly.
          </p>
          <p className="text-gray-700 text-lg">
            This website was created to make pet adoption easier, faster, and more trustworthy. 
            Our goal is to give every pet a second chance at life and every person a loyal companion.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/gZQ3hy4s/pet-adoption.jpg"
            alt="Happy adopted pet"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
