import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const RecommendedDonations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
 
console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/recommendDonationCompaigns');
        setData(res.data);
        setLoading(false);
      } catch (err) {
       console.log(err)
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means it runs once after component mounts

  if (loading) return <p>Loading...</p>;
 

  return (
    <div className="max-w-8xl mx-auto px-4 ">
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map(campaign => (
          <div key={campaign?._id} className="bg-white shadow-lg rounded-xl p-4">
            <img
              src={campaign?.petImage}
              alt={campaign?.petName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{campaign?.petName}</h2>
            <p className="text-sm text-gray-600">Max Donation: ${campaign?.maxDonation}</p>
            <p className="text-sm text-gray-600 mb-4">Donated: ${campaign?.donatedAmount}</p>
            <Link to={`/redonationCompaigns/${campaign?._id}`} className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedDonations;
