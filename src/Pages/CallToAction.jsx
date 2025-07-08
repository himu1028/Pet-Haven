import React from 'react';

const CallToAction = () => {
  return (
    <section className="relative max-w-8xl mx-auto bg-cover bg-center rounded-xl bg-no-repeat h-[400px] md:h-[500px]" style={{ backgroundImage: "url('https://i.ibb.co/pv06KF3H/sad.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
        <div className="text-center  max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-pink-500">
            Change a Life Today
          </h2>
          <p className="text-lg text-white md:text-xl mb-6 drop-shadow-sm">
            Thousands of pets are waiting for someone like you. Give them the love and home they deserve.
          </p>
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Adopt Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
