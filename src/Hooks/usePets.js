import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPets = async ({ pageParam = 1, queryKey }) => {
  const [_key, search, category] = queryKey;
  const limit = 6;

  const res = await axios.get('https://pet-adoption-server-kohl.vercel.app/pets', {
    params: { page: pageParam, limit, search, category },
  });

  return res.data;
};

export const usePets = (search, category) => {
  return useInfiniteQuery({
    queryKey: ['pets', search, category],
    queryFn: fetchPets,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / 6);
      const nextPage = allPages.length + 1;

      if (nextPage <= totalPages) {
        return nextPage;
      } else {
        return undefined; 
      }
    },
  });
};
