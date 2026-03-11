import React from "react";
import { Navigate } from "react-router-dom";


//This line creates a component called **ProtectedRoute** that takes a page 
// (`children`) and a setting (`adminOnly`, default false) to decide who can see that page.

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  
  // Check if user has any valid token
  const hasToken = token || adminToken;
  
  if (!hasToken) return <Navigate to="/login" />;
  
  // If admin-only route, ensure user has admin token
  if (adminOnly && !adminToken) return <Navigate to="/login" />;
  
  return children;
};
// ProtectedRoute: Stops users from opening pages they're not allowed to see.
// If user/admin is not logged in → sends them to the login page.
// Otherwise → shows the requested page.
export default ProtectedRoute;
