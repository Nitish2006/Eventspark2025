
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import HomePage from "./HomePage";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/events", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  return <HomePage />;
};

export default Index;
