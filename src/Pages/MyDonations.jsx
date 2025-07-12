import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const MyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/mydonations?email=${user.email}`)
        .then((res) => setDonations(res.data));
    }
  }, [user]);

  // ✅ Delete/Refund
  const handleRefund = async (id) => {
    const confirm = window.confirm("Are you sure you want to request a refund?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/donators/${id}`);
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error("Refund failed:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Donations</h2>

      {donations.length === 0 ? (
        <p className="text-center text-lg text-gray-600">You haven't donated yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Pet Image</th>
                <th className="p-2 border">Pet Name</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-t">
                  <td className="p-2 border">
                    <img
                      src={donation.petImage}
                      alt={donation.petName}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="p-2 border">{donation.petName}</td>
                  <td className="p-2 border font-semibold text-green-600">
                    ${donation.amount}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleRefund(donation._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Ask for Refund
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
