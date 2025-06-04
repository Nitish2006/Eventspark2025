
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  console.log("AdminLayout check:", { isAuthenticated, isAdmin, path: location.pathname });

  // Show loading indicator while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-college-primary mr-2" />
        <span>Loading authentication...</span>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not admin, redirect to events page
  if (!isAdmin) {
    console.log("Admin access required but user is not admin, redirecting to events page");
    return <Navigate to="/events" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-gray-100 flex-grow">
        <div className="container mx-auto py-6 px-6">
          <div className="flex items-center mb-6 text-college-primary">
            <ShieldCheck className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
