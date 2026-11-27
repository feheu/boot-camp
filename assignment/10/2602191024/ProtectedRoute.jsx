
"use client";

import { useAuth } from "./AuthContext";

export default function ProtectedRoute({
  children,
  requiredRole,
}) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <p>Loading authentication...</p>;
  }

  if (!user) {
    window.location.href = "/login";
    return <p>Redirecting to login...</p>;
  }

  if (requiredRole && role !== requiredRole) {
    window.location.href = "/profile";
    return <p>Access denied. Redirecting...</p>;
  }

  return children;
}
