
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  onSignUpClick: () => void;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  onSignUpClick
}) => {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-[#1E3A8A]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] animate-gradient-x">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl animate-fade-in animation-delay-200">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in animation-delay-300">
          <Link to={ctaLink}>
            <Button 
              size="lg" 
              className="bg-white text-[#1E3A8A] hover:bg-gray-100 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {ctaText}
            </Button>
          </Link>
          <Button 
            size="lg" 
            onClick={onSignUpClick}
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {secondaryCtaText}
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#F97316]/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#06B6D4]/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default AnimatedHero;
