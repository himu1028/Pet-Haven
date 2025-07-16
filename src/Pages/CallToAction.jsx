import React from 'react';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

const CallToAction = () => {
  return (
    <section className="relative max-w-8xl mx-auto bg-cover bg-center rounded-xl bg-no-repeat h-[400px] md:h-[500px]" style={{ backgroundImage: "url('https://i.ibb.co/pv06KF3H/sad.jpg')" }}>
      {/* Overlay */}
     
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
        <div className="text-center  max-w-2xl">
          <div className="text-2xl md:text-4xl pb-10 text-pink-500 font-bold">
                          <Typewriter
                            words={[
                              'Change a Life Today',
                              'Change a Life Today',
                              'Change a Life Today',
                             
                            ]}
                            loop={5}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                          />
                        </div>
          <p className="text-lg text-white md:text-xl mb-6 drop-shadow-sm">
            Thousands of pets are waiting for someone like you. Give them the love and home they deserve.
          </p>
          <Link to={'/petlisting'} className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Adopt Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
