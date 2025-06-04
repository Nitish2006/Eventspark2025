
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EventProvider } from "@/contexts/EventContext";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Pages
import HomePage from "@/pages/HomePage";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard";
import CreateEventPage from "@/pages/CreateEventPage";
import EditEventPage from "@/pages/EditEventPage";
import NotFound from "@/pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EventProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Home route */}
                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                
                {/* Public Routes */}
                <Route path="/events" element={<MainLayout><EventsPage /></MainLayout>} />
                <Route path="/events/:id" element={<MainLayout><EventDetailPage /></MainLayout>} />
                <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
                <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
                
                {/* Admin Routes - Use AdminLayout for direct access control */}
                <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin/events/create" element={<AdminLayout><CreateEventPage /></AdminLayout>} />
                <Route path="/admin/events/edit/:id" element={<AdminLayout><EditEventPage /></AdminLayout>} />
                
                {/* Catch-all route */}
                <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </EventProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
