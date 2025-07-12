import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const AdoptionRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/adoptions?email=${user.email}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.error("Failed to fetch adoption requests:", err));
    }
  }, [user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/adoptionRequests/${id}`, {
        status,
      });

      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Adoption Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Pet</th>
              <th className="p-2 border">Adopter Info</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="p-2 border flex items-center gap-3">
                  <img src={req.petImage} alt="Pet" className="w-16 h-16 object-cover rounded" />
                  <span>{req.petName}</span>
                </td>
                <td className="p-2 border">
                  <p><strong>Name:</strong> {user.displayName}</p>
                  <p><strong>Email:</strong> {req.email}</p>
                  <p><strong>Phone:</strong> {req.phone}</p>
                </td>
                <td className="p-2 border">{req.address}</td>
                <td className="p-2 border capitalize font-semibold text-blue-600">{req.status || "Pending"}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(req._id, "accepted")}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                    disabled={req.status === "accepted"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(req._id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    disabled={req.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No adoption requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdoptionRequests;
