import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  console.log(pets)

  const fetchPets = async () => {
    const res = await axios.get(`http://localhost:3000/pets`, {
      params: { search, category },
    });
    setPets(res.data);
  };

  useEffect(() => {
    fetchPets();
  }, [search, category]);

  const categories = ['', 'Dog', 'Cat', 'Rabbit', 'Fish', 'Bird'];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Pets for Adoption</h2>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full sm:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full sm:w-1/3"
        >
          <option value="">All Categories</option>
          {categories.filter(Boolean).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 🐾 Pets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet._id} className="bg-white rounded shadow p-4">
            <img src={pet.petImage} alt={pet.petName} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{pet.petName}</h3>
            <p className="text-sm text-gray-600">Age: {pet.petAge}</p>
            <p className="text-sm text-gray-600 mb-3">Location: {pet.petLocation}</p>
            <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListing;
