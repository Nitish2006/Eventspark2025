
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

interface CtaSectionProps {
  onSignUpClick: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onSignUpClick }) => {
  return (
    <section className="bg-gradient-to-br from-[#1E3A8A] to-[#1a2d69] text-white py-16 px-6 relative overflow-hidden dark:from-gray-900 dark:to-gray-800">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#06B6D4]/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#06B6D4]/30 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to discover campus events?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
          Join Vignan's Event Spark today and never miss another important event.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          <Link to="/events">
            <Button 
              size="lg" 
              className="bg-[#06B6D4] text-white border-none hover:shadow-lg hover:bg-[#06B6D4]/90 px-8 py-6 transform hover:scale-105 transition-all w-full md:w-auto"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Explore Events Now
            </Button>
          </Link>
          
          <Button
            size="lg"
            variant="outline"
            className="bg-[#F97316] border-[#F97316] text-white hover:bg-[#F97316]/90 hover:border-[#F97316]/90 px-8 py-6 w-full md:w-auto"
            onClick={onSignUpClick}
          >
            <Users className="mr-2 h-5 w-5" />
            Join Community
          </Button>
        </div>
        
        <div className="mt-8">
          <Link to="/events" className="text-[#06B6D4] hover:text-[#06B6D4]/80 hover:underline text-lg">
            View Schedule →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
