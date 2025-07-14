import React, { useEffect, useState } from 'react';
import useAxiosSecure from "../Hooks/useAxoisSecure";
import Swal from 'sweetalert2';
import SkeletonTableRow from "../../Component/SkeletonTableRow";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure.get('/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to make this user an admin!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, make admin!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${userId}`)
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire('Success!', 'This User is now an Admin.', 'success');
              setUsers(prev => prev.map(user =>
                user._id === userId ? { ...user, role: 'admin' } : user
              ));
            }
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Users</h2>

      {loading ? (
        // loading state e 6 ta skeleton card show korbe
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 text-sm uppercase tracking-wider">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Make Admin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user, idx) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={user.image}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 capitalize font-semibold text-blue-600">{user.role}</td>
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="text-green-600 font-bold">Admin</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm shadow-md"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
