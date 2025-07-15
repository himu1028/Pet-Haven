import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Query = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "What is the objectives ?",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
       Pet Haven is created to service the pets and to haven the pets..This is mainly a service based platform.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Connect with us on also <a href="www.facebook.com/pet-haven" className="text-blue-600 dark:text-blue-500 hover:underline"> facebook</a> and enjoy it.
          </p>
        </>
      )
    },
    {
      title: "Is there a donate system available?",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Yes you can donate for our pets from the pets Details page.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the  system.
          </p>
        </>
      )
    },
    {
      title: "How i sign up to here?",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Please go to the login page from our navbar up.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            You can use both together in the same project without any issue.
          </p>
          <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
            
          </ul>
        </>
      )
    }
  ];

  return (
    <div className="max-w-8xl mx-auto mt-10" id="accordion-collapse">

         <div className="text-2xl md:text-3xl pb-10 text-pink-500 font-bold">
                <Typewriter
                  words={[
                    'Know Your Query',
                   'Know Your Query',
                    'Know Your Query',
                  ]}
                  loop={5}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </div>
        
      {accordionData.map((item, index) => (
        <div key={index}>
          <h2>
            <button
              onClick={() => toggleAccordion(index)}
              className={`flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 ${index === 0 ? 'rounded-t-xl' : ''} focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
              aria-expanded={openIndex === index}
            >
              <span>{item.title}</span>
              <svg
                className={`w-3 h-3 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                aria-hidden="true"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div className={`${openIndex === index ? 'block' : 'hidden'} p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900`}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Query;
