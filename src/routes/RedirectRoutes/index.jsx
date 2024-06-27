import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RedirectRoutes = () => {
  const { userData } = useSelector((state) => state.auth);

  if (userData && userData.record.authtoken) {
    return <Navigate to={"/dashboard"} />;
  } else {
    return <Outlet />;
  }
};

export default RedirectRoutes;
