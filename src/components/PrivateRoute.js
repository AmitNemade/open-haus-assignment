import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/userProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
export default PrivateRoute;
