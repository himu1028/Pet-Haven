import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxoisSecure";
import SkeletonTableRow from "../../Component/SkeletonTableRow";


const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`http://localhost:3000/mydonations?email=${user.email}`)
        .then((res) => {
          setDonations(res.data);
          setLoading(false); 
        })
        .catch((err) => {
          console.error("Failed to load donations:", err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleRefund = async (id) => {
    const confirm = window.confirm("Are you sure you want to request a refund?");
    if (!confirm) return;

    try {
      await axiosSecure.delete(`http://localhost:3000/donators/${id}`);
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error("Refund failed:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Donations</h2>

      {loading ? (
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
              {[...Array(5)].map((_, i) => (
                <SkeletonTableRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      ) : donations.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          You haven't donated yet.
        </p>
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
