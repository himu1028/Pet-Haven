import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import RecommendedDonations from './RecommendedDonations';

const CompaignsDetails = () => {
  const donation = useLoaderData();
  console.log(donation)
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');

  const handleDonateClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handlePayment = () => {
    console.log('Proceed to pay:', amount);
    // ekhane payment logic add korbi
    setShowModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Donation Details */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
        <img src={donation.petImage} alt={donation.petName} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h2 className="text-3xl font-bold mb-2">{donation.petName}</h2>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Max Donation:</span> ${donation.maxDonation}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Donated So Far:</span> ${donation.donatedAmount}</p>
        <p className="text-gray-600 mb-4">{donation.description}</p>
        <button
          onClick={handleDonateClick}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Donate Now
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Enter Donation Amount</h3>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="Enter amount (e.g. 50)"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Donations */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Recommended Donations</h2>
        <RecommendedDonations />
      </div>
    </div>
  );
};

export default CompaignsDetails;