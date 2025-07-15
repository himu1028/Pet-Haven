import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import useAxiosSecure from '../Hooks/useAxoisSecure';
import SkeletonTableRow from '../../Component/SkeletonTableRow';

const AllDonations = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); 
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

 
  useEffect(() => {
    setLoading(true);
    axiosSecure.get('/admindonationCampaigns')
      .then(res => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false); 
      });
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This campaign will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admindonationCampaigns/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Campaign has been removed.', 'success');
              setCampaigns(prev => prev.filter(c => c._id !== id));
            }
          });
      }
    });
  };

 

  const handleTogglePause = (id, currentPauseStatus) => {
    axiosSecure.patch(`/donationCampaigns/${id}`, { paused: !currentPauseStatus })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire('Success!', `Campaign is now ${!currentPauseStatus ? 'paused' : 'active'}.`, 'success');
          setCampaigns(prev =>
            prev.map(camp =>
              camp._id === id ? { ...camp, paused: !currentPauseStatus } : camp
            )
          );
        }
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">All Donation Campaigns</h2>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Max Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              
              Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonTableRow key={idx} />
              ))
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">
                  No campaigns found.
                </td>
              </tr>
            ) : (
              campaigns.map((campaign, idx) => (
                <tr key={campaign._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={campaign.petImage}
                      alt="campaign"
                      className="w-12 h-12 rounded object-cover ring-2 ring-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{campaign.petName}</td>
                  <td className="px-6 py-4">${campaign.maxDonation}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      campaign.paused ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {campaign.paused ? 'Paused' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {campaign.createdAt
                      ? formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      to={`/edit-donations/${campaign._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(campaign._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleTogglePause(campaign._id, campaign.paused)}
                      className={`px-3 py-1 text-white rounded text-sm ${
                        campaign.paused ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {campaign.paused ? 'Unpause' : 'Pause'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonations;
