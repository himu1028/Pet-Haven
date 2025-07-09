import React from 'react';
import { Link } from 'react-router-dom';
import { FaCat, FaDog, FaFish, FaDove } from 'react-icons/fa';
import { GiRabbit } from 'react-icons/gi';

const categories = [
  { name: 'Cats', icon: <FaCat size={40} /> },
  { name: 'Dogs', icon: <FaDog size={40} /> },
  { name: 'Rabbits', icon: <GiRabbit size={40} /> },
  { name: 'Fish', icon: <FaFish size={40} /> },
  { name: 'Birds', icon: <FaDove size={40} /> },
];

const PetCategories = () => {
  return (
    <div className="py-10 bg-gray-300">
      <h2 className="text-3xl font-bold text-center text-pink-500 mb-8">
        Pet Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-11/12 mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category/${cat.name.toLowerCase()}`}
            className="flex flex-col items-center bg-white rounded-xl p-4 shadow hover:shadow-xl transition duration-300 group"
          >
            <div className="bg-purple-200 text-blue-600 rounded-full p-4 mb-2 group-hover:bg-purple-300 transition">
              {cat.icon}
            </div>
            <p className="text-sm font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PetCategories;
