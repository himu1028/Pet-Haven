import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxoisSecure";
// import useAxiosSecure from "../Hooks/useAxiosSecure"; // ✅ added

Modal.setAppElement("#root");

const MyDonationCampaigns = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ added
  const [campaigns, setCampaigns] = useState([]);
  const [donators, setDonators] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(donators);

  // Load user's donation campaigns
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/mydonationCompaigns?email=${user.email}`)
        .then((res) => setCampaigns(res.data));
    }
  }, [user, axiosSecure]);

  // Pause campaign
  const handlePauseToggle = async (id, isPaused) => {
    console.log(id);
    try {
      await axiosSecure.patch(`/donationCompaigns/${id}/pause`, {
        paused: !isPaused,
      });
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? { ...c, paused: !isPaused } : c))
      );
    } catch (err) {
      console.error("Pause toggle failed:", err);
    }
  };

  // View donators by petId - fetch and open modal
  const handleViewDonators = async (petId) => {
    console.log(petId);
    try {
      const res = await axiosSecure.get(`/donators?petId=${petId}`);
      setDonators(res.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching donators:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Donation Campaigns</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Pet Name</th>
              <th className="p-2 border">Max Amount</th>
              <th className="p-2 border">Progress</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => {
              const progress = Math.min(
                (campaign.donatedAmount / campaign.maxDonation) * 100,
                100
              );

              return (
                <tr key={campaign._id} className="border-t">
                  <td className="p-2 border">{campaign.petName}</td>
                  <td className="p-2 border">${campaign.maxDonation}</td>
                  <td className="p-2 border w-60">
                    <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                      <div
                        className="bg-green-600 h-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-center mt-1">
                      {progress.toFixed(1)}%
                    </p>
                  </td>
                  <td className="p-2 border">
                    {campaign.paused ? (
                      <span className="text-red-500 font-semibold">Paused</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() =>
                        handlePauseToggle(campaign._id, campaign.paused)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    >
                      {campaign.paused ? "Unpause" : "Pause"}
                    </button>
                    <Link
                      to={`/edit-donation/${campaign._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleViewDonators(campaign._id.toString())
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded"
                    >
                      View Donators
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for Donators */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Donators Info
        </h3>

        {donators.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Donators Email</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Donated To</th>
                </tr>
              </thead>
              <tbody>
                {donators.map((d, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 border">{d.email}</td>
                    <td className="p-2 border text-green-600 font-semibold">
                      ${d.amount}
                    </td>
                    <td className="p-2 border">{d.petName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-xl font-medium text-gray-600">
            No donations yet.
          </p>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyDonationCampaigns;
