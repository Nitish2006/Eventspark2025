
import React from "react";
import { Calendar, Users, Award } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-[#F97316]" />,
    title: "Stay Updated",
    description: "Never miss important campus events with our comprehensive event listings."
  },
  {
    icon: <Users className="h-8 w-8 text-[#F97316]" />,
    title: "Easy Registration",
    description: "Register for events with just one click and manage your event calendar."
  },
  {
    icon: <Award className="h-8 w-8 text-[#F97316]" />,
    title: "Organize Events",
    description: "Create and manage your own events with our intuitive admin dashboard."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F9FAFB] opacity-50"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center text-[#1E3A8A] mb-12">
          Why Use Vignan's Event Spark?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-16 h-16 bg-[#1E3A8A]/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="group-hover:animate-spin-slow">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1E3A8A]">{feature.title}</h3>
              <p className="text-[#4B5563]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
