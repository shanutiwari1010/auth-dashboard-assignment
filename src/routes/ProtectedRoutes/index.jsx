import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  return auth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location.pathname }} />
  );
};

export default ProtectedRoutes;
