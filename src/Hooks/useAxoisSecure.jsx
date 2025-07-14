import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const addToken = async (config) => {
      if (user) {
        const token = await user.getIdToken(); // Get Firebase token
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    const requestInterceptor = axiosSecure.interceptors.request.use(
      addToken,
      error => Promise.reject(error)
    );

    // clean up interceptor on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
