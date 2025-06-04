
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import EventCarousel from "@/components/EventCarousel";
import AnimatedHero from "@/components/AnimatedHero";
import FeatureSection from "@/components/FeatureSection";
import CtaSection from "@/components/CtaSection";
import SignUpModal from "@/components/SignUpModal";

const HomePage = () => {
  const { events } = useEvents();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/events", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(event => new Date(event.date) >= new Date())
    .slice(0, 6);

  return (
    <div className="pt-16">
      <AnimatedHero 
        title="Vignan's Event Spark"
        subtitle="Discover, connect, and participate in the best events happening around your campus."
        ctaText="Browse Events"
        ctaLink="/events"
        secondaryCtaText="Sign Up"
        secondaryCtaLink="#"
        onSignUpClick={() => setShowSignUpModal(true)}
      />

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">Upcoming Events</h2>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <EventCarousel events={upcomingEvents} />
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No upcoming events found.</p>
            </div>
          )}
        </div>
      </section>

      <FeatureSection />
      <CtaSection onSignUpClick={() => setShowSignUpModal(true)} />

      <SignUpModal 
        open={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)} 
      />
    </div>
  );
};

export default HomePage;
