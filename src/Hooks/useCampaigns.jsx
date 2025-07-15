import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCampaigns = async ({ pageParam = 1 }) => {
  const res = await axios.get(`http://localhost:3000/donationCompaigns`, {
    params: { page: pageParam, limit: 6 },
  });
  return res.data;
};

const useCampaigns = () => {
  return useInfiniteQuery({
    queryKey: ['donationCampaigns'],
    queryFn: fetchCampaigns,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / 6);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
};

export default useCampaigns;
