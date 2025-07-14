import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from "../Hooks/useAxoisSecure";
const AdoptionRequest = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`http://localhost:3000/adoption-requests?email=${user.email}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleAction = async (petId, requestId) => {
    console.log("Trying to update pet with ID:", petId);
    console.log("Trying to update adoption request ID:", requestId);

    try {
      // 1. Update pet status
      await axiosSecure.patch(`http://localhost:3000/pets/${petId}`, {
        adopted: true
      });

      // 2. Update adoption request status
      await axiosSecure.patch(`http://localhost:3000/adoption-requests/${requestId}`, {
        status: "Adopted Confirm"
      });

      // 3. Update UI
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "Adopted Confirm" } : r
        )
      );

      console.log("✅ Update success");
    } catch (error) {
      console.error("❌ Update failed:", error);
    }
  };

  const handleReject = async (requestId) => {
    console.log("Deleting request ID:", requestId);
    try {
      await axiosSecure.delete(`http://localhost:3000/adoption-requests/${requestId}`);
      console.log("❌ Rejected and deleted");

      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (error) {
      console.error("🚫 Reject failed:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Pet's Adoption Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Pet Name</th>
              <th className="p-2 border">Pet Image</th>
              <th className="p-2 border">Adopter Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{req.petName}</td>
                <td className="p-2 border">
                  <img
                    src={req.petImage}
                    alt="pet"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">{req.adopterName}</td>
                <td className="p-2 border">{req.email}</td>
                <td className="p-2 border">{req.phone}</td>
                <td className="p-2 border">{req.address}</td>
                <td className="p-2 border font-semibold text-blue-600">
                  {req.status || "Pending"}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleAction(req.petId, req._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleReject(req._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td className="p-4 text-center border" colSpan="9">
                  No adoption requests found for your pets.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdoptionRequest;
