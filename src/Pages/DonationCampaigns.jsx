import React from 'react';
import { Link } from 'react-router-dom';
import SkeletonCard from '../../Component/SkeletonCard';
import { useInView } from 'react-intersection-observer';
import useCampaigns from '../Hooks/useCampaigns';


const DonationCampaigns = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCampaigns();
  const { ref, inView } = useInView();


  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allCampaigns = data?.pages.flatMap(page => page.campaigns) || [];

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Donation Campaigns</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          : allCampaigns.map(campaign => (
              <div key={campaign._id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col">
                <img
                  src={campaign.petImage}
                  alt={campaign.petName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">{campaign.petName}</h2>
                <p className="text-sm text-gray-600">Max Donation: ${campaign.maxDonation}</p>
                <p className="text-sm text-gray-600 mb-4">Donated: ${campaign.donatedAmount}</p>
                <Link to={`/donationCompaigns/${campaign._id}`} className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Details
                </Link>
              </div>
            ))
        }
      </div>

      {/* Loading spinner or sentinel for intersection */}
      <div ref={ref} className="text-center mt-6">
        {isFetchingNextPage && (
          <p className="text-gray-600">Loading more campaigns...</p>
        )}
        {!hasNextPage && !isLoading && (
          <p className="text-gray-500">No more campaigns to load.</p>
        )}
      </div>
    </div>
  );
};

export default DonationCampaigns;
