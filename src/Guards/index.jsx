import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Login from "../pages/login";

export default function Guards() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
