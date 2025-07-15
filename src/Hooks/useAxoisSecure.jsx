import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user,signOutUser } = useAuth();
const navigate = useNavigate();
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



   axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/dashboard');
        }
        else if (status === 401) {
            signOutUser()
                .then(() => {
                     navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })
  return axiosSecure;
};

export default useAxiosSecure;
