import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  // If user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user’s role doesn’t match (e.g., candidate trying to access employer route)
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // Otherwise, allow access
  return children;
};

export default ProtectedRoute;
