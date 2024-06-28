import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoutes = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  // const { isLoading, error, isAuthenticated, user } = useAuth0();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return auth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location.pathname }} />
  );
};

export default ProtectedRoutes;
