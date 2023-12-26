import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUser } from './common';

// handle the public routes
const PublicRoutes = () => {
  const role = getUser()?.role;

  console.log(role);



  return !getToken() ? <Outlet /> : role === "Admin" ? <Navigate to="/dashboard" /> : <Navigate to="/app1" />
}

export default PublicRoutes;