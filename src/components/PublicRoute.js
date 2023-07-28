import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/userProvider";

const PublicRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
export default PublicRoute;
