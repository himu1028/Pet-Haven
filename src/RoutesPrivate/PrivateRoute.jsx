import React from 'react';

import { Navigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({children}) => {
     const { user, loading } = useAuth();
 
  if (loading) {
    return <div className="text-center py-10 text-xl font-bold">Loading...</div>; 
  }
  
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;