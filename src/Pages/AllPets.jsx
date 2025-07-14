import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';
import useAxiosSecure from '../Hooks/useAxoisSecure';
import SkeletonTableRow from '../../Component/SkeletonTableRow';
import { Link } from 'react-router';


const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // ✅ loader state
  const axiosSecure = useAxiosSecure();

  // Load all pets
  useEffect(() => {
    setLoading(true); // start loader
    axiosSecure.get('/allpetts')
      .then(res => {
        console.log('🐾 All pets data:', res.data);
        setPets(res.data.pets);
        setTotal(res.data.total);
        setLoading(false); // stop loader
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // stop loader on error
      });
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this pet!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/pets/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Pet has been deleted.', 'success');
              setPets(pets.filter(p => p._id !== id));
            }
          });
      }
    });
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = !currentStatus;
    axiosSecure.patch(`/peets/${id}`, { adopted: newStatus })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire('Success!', 'Pet status updated.', 'success');
          setPets(prev =>
            prev.map(pet =>
              pet._id === id ? { ...pet, adopted: newStatus } : pet
            )
          );
        }
      });
  };



  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">All Pets</h2>
      <p className="text-right text-sm text-gray-500 mb-2">Total pets: {total}</p>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Pet Name</th>
              <th className="px-6 py-4">Created/Updated</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              // ✅ Show 6 skeleton rows while loading
              Array.from({ length: 6 }).map((_, i) => <SkeletonTableRow key={i} />)
            ) : pets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No pets found.
                </td>
              </tr>
            ) : (
              pets.map((pet, idx) => (
                <tr key={pet._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={pet.petImage}
                      alt="pet"
                      className="w-12 h-12 rounded object-cover ring-2 ring-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{pet.petName}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {pet.createdAt
                      ? formatDistanceToNow(new Date(pet.createdAt), { addSuffix: true })
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600">
                    {pet.adopted ? 'Adopted' : 'Not Adopted'}
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    <Link
                      to={`/update-pet/${pet._id}`}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded shadow"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleToggleStatus(pet._id, pet.adopted)}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded shadow"
                    >
                      Mark as {pet.adopted ? 'Not Adopted' : 'Adopted'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPets;
