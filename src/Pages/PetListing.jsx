import React, { useState, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { usePets } from '../Hooks/usePets';
import SkeletonCard from '../../Component/SkeletonCard';


const PetListing = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = usePets(search, category);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const categories = ['', 'Dog', 'Cat', 'Rabbit', 'Fish', 'Bird'];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Pets for Adoption
      </h2>

      {/*  Search & Filter */}
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
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/*  Pets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {status === 'loading' &&
          
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {data?.pages?.map((page) =>
          page?.pets?.map((pet) => (
            <div key={pet._id} className="bg-white rounded shadow p-4">
              <img
                src={pet.petImage}
                alt={pet.petName}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">{pet.petName}</h3>
              <p className="text-sm text-gray-600">Age: {pet.petAge}</p>
              <p className="text-sm text-gray-600 mb-3">
                Location: {pet.petLocation}
              </p>
              <Link
                to={`/pets/${pet._id}`}
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))
        )}

        {isFetchingNextPage &&
          
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`loading-${i}`} />)}
      </div>

      {/* Infinite Scroll Loader Ref */}
      <div ref={ref} className="text-center mt-6">
        {isFetchingNextPage && <p>Loading more pets...</p>}
      </div>
    </div>
  );
};

export default PetListing;
