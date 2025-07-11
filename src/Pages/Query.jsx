import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Query = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "What is Flowbite?",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster.
          </p>
        </>
      )
    },
    {
      title: "Is there a Figma file available?",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma software so everything you see has a design equivalent.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a>.
          </p>
        </>
      )
    },
    {
      title: "What are the differences between Flowbite and Tailwind UI?",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is open source under the MIT license, whereas Tailwind UI is a paid product. Flowbite uses small standalone components.
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            You can use both together in the same project without any issue.
          </p>
          <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
            <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
            <li><a href="https://tailwindui.com/" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
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
