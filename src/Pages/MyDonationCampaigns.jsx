import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

Modal.setAppElement("#root");

const MyDonationCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [donators, setDonators] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
console.log(campaigns)
  // Load user's donation campaigns
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/mydonationCompaigns?email=${user.email}`)
        .then((res) => setCampaigns(res.data));
    }
  }, [user]);

  // Pause campaign
  const handlePauseToggle = async (id, isPaused) => {
    try {
      await axios.patch(`http://localhost:3000/donationCompaigns/${id}`, {
        paused: !isPaused,
      });
      setCampaigns((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, paused: !isPaused } : c
        )
      );
    } catch (err) {
      console.error("Pause toggle failed:", err);
    }
  };

  // View donators
  const handleViewDonators = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/donators/${id}`);
      setDonators(res.data);
      setModalIsOpen(true);
    } catch (err) {
      console.error("Failed to load donators:", err);
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
                    <p className="text-xs text-center mt-1">{progress.toFixed(1)}%</p>
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
                      onClick={() => handleViewDonators(campaign._id)}
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
        className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-xl font-semibold mb-4">Donators</h3>
        {donators.length > 0 ? (
          <ul className="space-y-2">
            {donators.map((d, i) => (
              <li key={i} className="flex justify-between">
                <span>{d.name}</span>
                <span className="font-bold text-green-600">${d.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No donations yet.</p>
        )}
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MyDonationCampaigns;
