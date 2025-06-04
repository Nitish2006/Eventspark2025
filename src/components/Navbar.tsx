import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Loader2, ShieldCheck, Bell, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import SignUpModal from "./SignUpModal";

const mockNotifications = [
  {
    id: 1,
    title: "New Event Added",
    message: "A new tech workshop has been added to the calendar."
  },
  {
    id: 2,
    title: "Event Reminder",
    message: "The annual tech fest starts tomorrow!"
  }
];

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/events");
    setShowMenu(false);
  };

  return (
    <>
      <nav 
        className={`${
          isScrolled ? "bg-[#1E3A8A]/95 shadow-lg" : "bg-[#1E3A8A]"
        } text-white py-4 px-6 fixed top-0 left-0 w-full z-50 transition-all duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 z-10">
            <Calendar className="h-6 w-6" />
            <span className="text-xl font-bold">Vignan's Event Spark</span>
          </Link>

          {isMobile && (
            <div className="flex items-center gap-2 z-10">
              {isAuthenticated && (
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 bg-[#06B6D4] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </button>
              )}
              
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          )}

          {!isMobile && (
            <div className="flex items-center space-x-6">
              <Link to="/events" className="hover:text-[#06B6D4] transition-colors">
                Events
              </Link>
              
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin/dashboard" 
                      className="flex items-center text-yellow-300 hover:text-yellow-100 transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4 mr-1" />
                      <span>Admin</span>
                    </Link>
                  )}
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 bg-[#06B6D4] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        2
                      </span>
                    </button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 text-gray-700 z-20">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="font-medium text-[#1E3A8A]">Notifications</h3>
                        </div>
                        {mockNotifications.map(notification => (
                          <div key={notification.id} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.message}</p>
                          </div>
                        ))}
                        <div className="p-2 text-center border-t border-gray-200">
                          <button className="text-sm text-[#06B6D4] hover:underline">
                            View all notifications
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Welcome, {user?.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLogout}
                      className="bg-transparent border-white text-white hover:bg-white/10"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-x-2">
                  <Link to="/login">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-transparent border-white text-white hover:bg-white/10"
                    >
                      Login
                    </Button>
                  </Link>
                  <Button 
                    size="sm"
                    className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                    onClick={() => setShowSignUpModal(true)}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          )}

          {isMobile && showMenu && (
            <div className="fixed inset-0 top-16 bg-[#1E3A8A] z-40 animate-fade-in">
              <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
                <Link 
                  to="/events" 
                  className="text-xl font-medium hover:text-[#F97316] transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  Events
                </Link>
                
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link 
                        to="/admin/dashboard" 
                        className="flex items-center text-xl font-medium text-yellow-300 hover:text-yellow-100 transition-colors"
                        onClick={() => setShowMenu(false)}
                      >
                        <ShieldCheck className="h-5 w-5 mr-2" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-lg mb-2">Hello, {user?.name}</p>
                      <Button 
                        onClick={handleLogout}
                        className="w-full bg-white/10 hover:bg-white/20"
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" onClick={() => setShowMenu(false)}>
                      <Button variant="outline" className="w-full bg-transparent border-white">
                        Login
                      </Button>
                    </Link>
                    <Button 
                      className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90"
                      onClick={() => {
                        setShowSignUpModal(true);
                        setShowMenu(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isMobile && showNotifications && isAuthenticated && (
            <div className="fixed inset-x-0 top-16 bg-white shadow-lg max-h-[70vh] overflow-y-auto animate-fade-in z-30">
              <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                <h3 className="font-medium text-[#1E3A8A]">Notifications</h3>
              </div>
              {mockNotifications.map(notification => (
                <div key={notification.id} className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                </div>
              ))}
              <div className="p-3 text-center">
                <button className="text-sm text-[#06B6D4]">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <div className="h-16"></div>
      
      <SignUpModal 
        open={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)} 
      />
    </>
  );
};

export default Navbar;
