
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: "admin" | "user";
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth();
  const location = useLocation();

  console.log("Protected route check:", { 
    isAuthenticated, 
    isAdmin, 
    allowedRole, 
    userRole: user?.role,
    userEmail: user?.email,
    path: location.pathname 
  });

  // Show loading indicator or placeholder while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-college-primary mr-2" />
        <span>Loading authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires admin access and user is not an admin
  if (allowedRole === "admin" && !isAdmin) {
    console.log("Admin access required but user is not admin, redirecting to events page");
    return <Navigate to="/events" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
