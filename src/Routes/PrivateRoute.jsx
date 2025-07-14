import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // not 'react-router'
import { AuthContext } from '../AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-10 text-xl font-bold">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
