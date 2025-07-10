import React, { useEffect, useState } from 'react';

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/donationCompaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data));
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Donation Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div key={campaign._id} className="bg-white shadow-lg rounded-xl p-4">
            <img
              src={campaign.petImage}
              alt={campaign.petName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{campaign.petName}</h2>
            <p className="text-sm text-gray-600">Max Donation: ${campaign.maxDonation}</p>
            <p className="text-sm text-gray-600 mb-4">Donated: ${campaign.donatedAmount}</p>
            <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCampaigns;